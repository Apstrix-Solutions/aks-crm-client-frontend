import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.scss'],
})
export class AddLeadsComponent implements OnInit {
  newAddLeadForm!: FormGroup;
  leadAssignForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  addLeadListById: any = {};
  addLeadsList: any;
  addLeadService: any;
  recievedData: any = {};
  refreshToken: string;
  lStatus: any = [];
  lSource: any = [];
  industry_ids: any = [];
  companyData: any = {};
  socialData:  any = {};
  industryNames: any = [];
  assigned_to: any = 0;

  constructor(
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private leadService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.newAddLeadForm = this.formBulider.group({
      title: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      middleName: [null],
      lastName: [null, [Validators.required]],
      primaryNumber: [null,[
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ]
      ],
      secondaryNumber: [null,[
          Validators.pattern("^[0-9]*$")
        ]
      ],
      whatsappNumber: [null,[
          Validators.pattern("^[0-9]*$")
        ]
      ],
      leadScore: [null],
      leadValue: [null],
      email: [null, [Validators.required, Validators.email]],
      leadSourceId: [null],
      currentStatus: [null, [Validators.required]],
      address: [null],
      city: [null],
      state: [null],
      country: [null],
      zip: [null],
      website: [null],
      linkedin: [null],
      facebook: [null],
      background_info: [null],
      companyName: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      industryId: [null,[Validators.required]],
    });

    //recieving data
    //A subscription is made to listen to changes in the BehaviorSubject.

    if (!this.id) {
      this.leadService.sub.subscribe((response) => {
        this.id = response.id;
        this.recievedData = response;
        this.newAddLeadForm.patchValue(this.recievedData);
      });
    } else {
      this.leadService.getLeadById(this.id).subscribe((res) => {
        res['body']['data']['users'].forEach( data => {
          this.recievedData = data
        })
        this.newAddLeadForm.patchValue(this.recievedData);

        this.getLeadAddress();
        this.getLeadSocials();
        this.getCompanyById();
      });
    }

    this.leadStatus();
    this.leadSource();
    this.industries();
  }

  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken);
    }
  }

  addLeads() {
    this.leadService.addLead(this.newAddLeadForm.value).subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      if (res['body']['code'] == 200) {
        this.toastr.success(res['message'], 'Success!');
        this.ngZone.run(() => this.router.navigateByUrl('/leads'));
      } else {
        this.toastr.error(res['errorMessage'], 'Error!');
      }
    });
  }

  updateLeads() {
    
    this.leadService
      .updateLead(this.newAddLeadForm.value, this.id)

      .subscribe((res) => {
        this.refreshToken = res.headers.get('refresh_token');
        if (res['body']['code'] == 200) {
          this.ngZone.run(() => this.router.navigateByUrl('/leads'));
          this.toastr.success(res['message'], 'Successfully updated the lead');
        } else {
          this.toastr.error(res['message'], 'Error!');
        }
      });
  };

  leadStatus() {
    this.leadService.leadStatus().subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      this.lStatus = res['body']['data']['status'];
    });
  };

  leadSource() {
    this.leadService.leadSource().subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      this.lSource = res['body']['data']['data'];
    });
  };

  getLeadAddress() {
    this.leadService.getLeadAddressByLeadId(this.id).subscribe((res) => {
      let addressdata = res['body']['data']['address'];
      
      addressdata.forEach( data => this.addLeadListById = data);

      if (addressdata) {
        this.newAddLeadForm.patchValue({
          address: addressdata.address,
          city: addressdata.city,
          state: addressdata.state,
          country: addressdata.country,
          zip: addressdata.zip,
        });
      }
    });
  }

  getLeadSocials() {
    this.leadService.getLeadSocialsByLeadId(this.id).subscribe((res) => {
      let socialdata = res['body']['data']['social'];
      
      socialdata.forEach( data => this.socialData = data);

      if (socialdata) {
        this.newAddLeadForm.patchValue({
          facebook: socialdata.facebook,
          website: socialdata.website,
          linkedin: socialdata.linkedin,
          background_info: socialdata.background_info,
        });
      }
    });
  };

  industries(){
    this.leadService.getAllIndustries().subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      this.industryNames = res['body']['data']['data'];
    })
  };

  updateLeadAssignment(){

    if(this.assigned_to){
      this.leadService.updateLeadAssignment(this.assigned_to,this.id).subscribe( (res) => {
        this.refreshToken = res.headers.get('refresh_token');
        if(res['body']['code']==200){
          this.toastr.success(res['message'], 'Success');
        }else{
          this.toastr.error(res['message'],'Error')
        }
      })
    }

  };

  leadAssign(event: any){
    this.assigned_to = event.target.value;
  };

  onSubmit() {
    if (this.newAddLeadForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addLeads();
    } else {
      this.updateLeads();
      // this.updateLeadAssignment();
    }
  }


  get f() {
    return this.newAddLeadForm.controls;
  }

  getCompanyById(){
    this.leadService.getCompanyByLeadId(this.id).subscribe(res => {
      const companyData = res['body']['data']['data'];

      if(companyData) {
        this.newAddLeadForm.patchValue({
          companyName: companyData.name,
          designation: companyData.designation,
          industryId: companyData.industry_id,
        });
      }
    })
  }

}
