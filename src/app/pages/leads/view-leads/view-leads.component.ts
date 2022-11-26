import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss']
})
export class ViewLeadsComponent implements OnInit {
  newAddLeadForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  ImageProp="../../../../assets/img/user.svg";
  leadDetails: any = [];
  leadSocialDetails: any = [];
  leadAddressDetails: any = [];
  leadId: string;


  constructor(
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private leadService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.leadId = this.id;
    this.newAddLeadForm = this.formBulider.group({
      title: [null, ],
      firstName: [null, ],
      middleName: [null],
      lastName: [null, ],
      primaryNumber: [null, ],
      secondaryNumber: [null],
      whatsappNumber: [null],
      leadScore: [null],
      leadValue: [null],
      email: [null,],
      leadSourceId: [null],
      currentStatus: [null, ],
      address: [null],
      city: [null],
      state: [null],
      country: [null],
      zip: [null],
      website: [null],
      linkedin: [null],
      facebook: [null],
      background_info: [null],
    });

    // if(this.id){
      // this.getLeadById();
      // this.getLeadAddressById();
      // this.getLeadSocialById();
    // }
    this.getLeadById();
    this.getLeadAddressById();
    this.getLeadSocialById();
    console.log('---',this.leadId);
    
   
  }

  addContact(){
    this.ngZone.run(() => this.router.navigateByUrl(`add-contacts/${this.leadId}`));
  }

  // listContact(){
  //   this.ngZone.run(() => this.router.navigateByUrl(`contacts/${this.leadId}`));
  // }
  getLeadById(){
    this.leadService.getLeadById(this.leadId).subscribe((res) => {
      this.leadDetails = res['data']['users'];
      console.log('get lead by id',this.leadDetails)
    })
  }

  getLeadSocialById() {
    this.leadService.getLeadSocialsByLeadId(this.leadId).subscribe((res) => {
      this.leadSocialDetails = res['data']['social'];
    })
  }

  getLeadAddressById() {
    this.leadService.getLeadAddressByLeadId(this.leadId).subscribe((res) => {
      this.leadAddressDetails = res['data']['address'];
    })
  }


  onSubmit(){

  }

  get f() {
    return this.newAddLeadForm.controls;
  }

}
