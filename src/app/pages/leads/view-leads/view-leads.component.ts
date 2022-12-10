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
  leadDetails: any = [];
  leadSocialDetails: any = [];
  leadAddressDetails: any = [];
  leadId: string;
  userId: any;
  usersList: any = [];
  currentUser: any;
  activityList: any = [];
  IsmodelShow:boolean = false;


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
    });

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

  createActivity(){
    
    this.leadService.createActivities(this.activityForm.value).subscribe((res) => {
      // console.log(res)
      if (res['code'] == 200) {
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
      this.activityList = res['data']['activities']
    })
  }


  closeModal(idElm: any) {
    let element: HTMLElement = document.getElementById(idElm) as HTMLElement;
    element.click();
  }

  openConfirmBox(content, activityId) {
    if (confirm('Are you sure to delete ?')) {
      
      this.leadService.deleteActivities(activityId).subscribe((res) => {
        this.getActivitiesByeLeadId();

        if (res['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

  get f(){
    return this.leadAssignForm.controls;
  }
  get log(){
    return this.activityForm.controls;
  }
}
