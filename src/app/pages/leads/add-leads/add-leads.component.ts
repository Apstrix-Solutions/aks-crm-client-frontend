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
  id: string;
  isAddMode: boolean;
  addLeadListById: any = [];
  addLeadsList: any;
  addLeadService: any;
  recievedData: any = {};
  refreshToken: string;
  lStatus: any = [];
  lSource: any = [];
  industry_ids: any = [];

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
      primaryNumber: [null, [Validators.required]],
      secondaryNumber: [null],
      whatsappNumber: [null],
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
      industryId: [null],
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
        this.recievedData = res['data']['users'];
        this.newAddLeadForm.patchValue(this.recievedData);

        this.getLeadAddress();
        this.getLeadSocials();
      });
    }

    this.leadStatus();
    this.leadSource();
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
    console.log('entered to update');

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
  }

  leadStatus() {
    this.leadService.leadStatus().subscribe((res) => {
      this.lStatus = res['data']['status'];
    });
  }

  leadSource() {
    this.leadService.leadSource().subscribe((res) => {
      this.lSource = res['data']['data'];
    });
  }

  get f() {
    return this.newAddLeadForm.controls;
  }

  getLeadAddress() {
    this.leadService.getLeadAddressByLeadId(this.id).subscribe((res) => {
      let addressdata = res['data']['address'];

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
      let socialdata = res['data']['social'];
      console.log(socialdata);
      if (socialdata) {
        this.newAddLeadForm.patchValue({
          facebook: socialdata.facebook,
          website: socialdata.website,
          linkedin: socialdata.linkedin,
          background_info: socialdata.background_info,
        });
      }
    });
  }

  onSubmit() {
    if (this.newAddLeadForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addLeads();
    } else {
      this.updateLeads();
    }
  }
}
