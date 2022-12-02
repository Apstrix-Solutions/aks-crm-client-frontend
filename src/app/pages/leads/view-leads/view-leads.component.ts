import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../lead.service';


@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss'],
})
export class ViewLeadsComponent implements OnInit {
  id: string;
  ImageProp = '../../../../assets/img/user.svg';
  leadAssignForm!: FormGroup;
  leadDetails: any = [];
  leadSocialDetails: any = [];
  leadAddressDetails: any = [];
  leadId: string;
  userId: any;
  usersList: any = [];


  constructor(
    private ngZone: NgZone,
    private router: Router,
    private leadService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private formBulider: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.leadId = this.id;
    this.leadAssignForm = this.formBulider.group({
      lead_id:[this.id],
      assigned_to:[null,[Validators.required]]
    })

    this.getLeadById();
    this.getLeadAddressById();
    this.getLeadSocialById();
  }

  addContact() {
    this.ngZone.run(() =>
      this.router.navigateByUrl(`add-contacts/${this.leadId}`)
    );
  }
  getLeadById() {
    this.leadService.getLeadById(this.leadId).subscribe((res) => {
      res['data']['users'].forEach((lead: any) => { 
        this.leadDetails = lead;
      });
      console.log('get lead by id', this.leadDetails);
    });
  }

  getLeadSocialById() {
    this.leadService.getLeadSocialsByLeadId(this.leadId).subscribe((res) => {
      res['data']['social'].forEach((social: any) => {
        this.leadSocialDetails = social;
      });
    });
  }

  getLeadAddressById() {
    this.leadService.getLeadAddressByLeadId(this.leadId).subscribe((res) => {
      res['data']['address'].forEach((address: any) => {
        this.leadAddressDetails = address;
      });
    });
  }

  getAllUserDetails(){
    this.leadService.getAllUserDetails().subscribe((res) => {
      this.usersList = res;
      console.log('usersList',this.usersList)
    })
  }

  leadAssignedTo(){
  
    console.log('lead Assignment form',this.leadAssignForm.value)
    this.leadService.leadAssignment(this.leadAssignForm.value).subscribe((res) => {
      // console.log(res)
      if(res['code']==200){
        this.toastr.success(res['message'],'Success!');
      }
      else{
        this.toastr.error(res['message'],'Error!');
      }
    })

  }

  get f(){
    return this.leadAssignForm.controls;
  }
}
