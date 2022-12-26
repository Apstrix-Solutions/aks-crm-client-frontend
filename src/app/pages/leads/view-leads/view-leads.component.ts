import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
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
  @ViewChild('closebutton') closebutton;
  id: string;
  ImageProp = '../../../../assets/img/user.svg';
  leadAssignForm!: FormGroup;
  activityForm!: FormGroup;
  refreshToken: string;
  leadDetails: any = [];
  leadSocialDetails: any = [];
  leadAddressDetails: any = [];
  leadId: string;
  userId: any;
  usersList: any = [];
  currentUser: any;
  activityList: any = [];
  IsmodelShow:boolean = false;
  leadCompanyDetails :any = [];


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
    

    this.activityForm = this.formBulider.group({
      user_id:[null],
      lead_id:[null],
      contact_mode:[null,[Validators.required]],
      comment:[null,[Validators.required]]
    });


    this.getLeadById();
    this.getLeadAddressById();
    this.getLeadSocialById();
    this.currentUser = localStorage.getItem('userId');

    this.activityForm.patchValue({user_id:this.currentUser,lead_id:this.leadId})
    this.getActivitiesByeLeadId();
    this.getCompanyById();
  }

  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }

  addContact() {
    this.ngZone.run(() =>
      this.router.navigateByUrl(`add-contacts/${this.leadId}`)
    );
  }
  getLeadById() {
    this.leadService.getLeadById(this.leadId).subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      res['body']['data']['users'].forEach((lead: any) => { 
       
        if(lead.currentStatus){
          this.getStatusById(lead.currentStatus);
        }
        this.leadDetails = lead;
      });
      console.log('getLeadById',this.leadDetails)
    });
  }

  getStatusById(statusId:any){
    this.leadService.getStatusById(statusId).subscribe(res => {
      const status = res['body']['data']['status']
      this.leadDetails.leadStatus = status.name
    })
  }

  getCompanyById(){
    this.leadService.getCompanyByLeadId(this.leadId).subscribe(res => {
      // this.leadCompanyDetails = res['body']['data']
      const data = res['body']['data']['data'];
      if(data){
        this.getIndustryById(data.industry_id);
      }
      this.leadCompanyDetails = data;
    })
  }
  getIndustryById(industryId:any){
    this.leadService.getIndustryById(industryId).subscribe(res => {
      const data = res['body']['data']['data']
      this.leadCompanyDetails.name = data.name
    })
  }
 


  getLeadSocialById() {
    this.leadService.getLeadSocialsByLeadId(this.leadId).subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      res['body']['data']['social'].forEach((social: any) => {
        this.leadSocialDetails = social;
      });
      console.log('getLeadSocialById',this.leadSocialDetails)
    });
  }

  getLeadAddressById() {
    this.leadService.getLeadAddressByLeadId(this.leadId).subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      res['body']['data']['address'].forEach((address: any) => {
        this.leadAddressDetails = address;
      });
      console.log('getLeadAddressById',this.leadAddressDetails)
    });
  }

  getAllUserDetails(){
    this.leadService.getAllUserDetails().subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      this.usersList = res;
    })
    console.log('getAllUserDetails',this.usersList)
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

  createActivity(){
    
    this.leadService.createActivities(this.activityForm.value).subscribe((res) => {
      // console.log(res)
      this.refreshToken = res.headers.get('refresh_token');
      if (res['body']['code'] == 200) {
        this.toastr.success(res['message'], 'Success!');
        this.getActivitiesByeLeadId();
        this.closeModal('activityModelClose');

      } else {
        this.toastr.error(res['errorMessage'], 'Error!');
      }
    })

  }

  getActivitiesByeLeadId(){
    this.leadService.getActivitiesByLeadId(this.leadId).subscribe((res) =>{
      this.refreshToken = res.headers.get('refresh_token');
      this.activityList = res['body']['data']['activities']
    })
  }


  closeModal(idElm: any) {
    let element: HTMLElement = document.getElementById(idElm) as HTMLElement;
    element.click();
  }

  openConfirmBox(content, activityId) {
    if (confirm('Are you sure to delete ?')) {
      
      this.leadService.deleteActivities(activityId).subscribe((res) => {
        this.refreshToken = res.headers.get('refresh_token');
        this.getActivitiesByeLeadId();

        if (res['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

  get log(){
    return this.activityForm.controls;
  }
}
