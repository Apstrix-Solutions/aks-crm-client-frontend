import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '@app/pages/leads/lead.service';
import { AppointmentService } from '../appointment.service';
import { IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  newAppointmentForm!: FormGroup;
  id: string;
  agencyId:any;
  isAddMode: boolean;
  refreshToken: string;
  appointmentList: any = [];
  appointmentListById: any = [];
  leadIds: any = [];
  userIds: any = [];
  userDropdownList = [];
  leadDropdownList = [];
  leadDropdownSettings:IDropdownSettings={};
  userDropdownSettings:IDropdownSettings={};
  selectedUsers:any = [];
  selectedLeads:any = [];



  constructor(
    private appointmentService: AppointmentService,
    private leadService: LeadService,
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.agencyId = localStorage.getItem('AgencyId');
    this.newAppointmentForm = this.formBulider.group({
      subject: [null, Validators.required],
      lead_id: [null, Validators.required],
      user_id: [null, Validators.required],
      agency_id:[this.agencyId],
      comment: [null],
      Regarding: [null],
      meet_link:[null, [Validators.required]],
      status: ['Pending'],
      Location: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required]
    });

    this.newAppointmentForm.patchValue({'agency_id':this.agencyId});

    //get user under agency in the dropdown
    this.leadService.getAllUserDetails().subscribe((data) => {
      const userData = data['body']['data']['data']
      userData.forEach((user: any) => { this.userIds.push( {user_id:user.id,name:user.fullname} ) });
      this.userDropdownList = this.userIds;
      this.userDropdownSettings = {
        idField: 'user_id',
        textField: 'name',
      };
    })

    //get lead in the dropdown
    this.leadService.getAgencyLeads().subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      const leadData = data['body']['data']['leads'];
      leadData.forEach((lead: any) => { this.leadIds.push( {lead_id:lead.id,name:lead.firstName} ) });
      this.leadDropdownList = this.leadIds;
      this.leadDropdownSettings = {
        idField: 'lead_id',
        textField: 'name',
      };
    });

    if(this.id) {
      this.getAppointment();
    }
  }

  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }


  addNewAppointment() {
    this.appointmentService.createAppointment(this.newAppointmentForm.value).subscribe( (res) => {
      if (res['body']['code'] == 200) {
        this.ngZone.run(() => this.router.navigateByUrl(`list-appointments`));
        this.toastr.success(res['message'],'Successfully created the contact');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }

  editAppointment() {
    const id = this.id
    this.appointmentService.updateAppointment(this.newAppointmentForm.value,id).subscribe( (res) => {
      if (res['body']['code'] == 200) {
        this.ngZone.run(() => this.router.navigateByUrl(`list-appointments/${this.agencyId}`));
        this.toastr.success(res['message'],'Successfully updated the contact');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }

  getAppointment(){

    this.appointmentService.getAppointment(this.id).subscribe( (res) => {
      this.appointmentListById = res['body']['data']['data'][0];

      if(this.appointmentListById.Appointment_users) {
        let userData = this.appointmentListById.Appointment_users;

        for (var i = 0; i < userData.length; i++) {
          this.selectedUsers.push(userData[i].user_id);
        }
      }

      if(this.appointmentListById.Appointments_leads) {
        let leadsData = this.appointmentListById.Appointments_leads;

        for (var i = 0; i < leadsData.length; i++) {
          this.selectedLeads.push(leadsData[i].lead_id);
        }
      }
      
      this.newAppointmentForm.patchValue({user_id:this.selectedUsers})
      this.newAppointmentForm.patchValue({lead_id:this.selectedLeads});
      const data = this.appointmentListById
      this.newAppointmentForm.patchValue({
        subject: this.appointmentListById.subject,
        Regarding: this.appointmentListById.Regarding,
        meet_link: this.appointmentListById.meet_link,
        time: this.appointmentListById.time,
        status: this.appointmentListById.status,
        Location: this.appointmentListById.Location,
        comment: this.appointmentListById.comment,
      })
      this.newAppointmentForm.patchValue({date:"2022-10-10s"});
    })
  }
 
  selectUser(event){
     this.selectedUsers.push(event.user_id) 
     console.log('---select---', this.selectedUsers)
     this.newAppointmentForm.patchValue({user_id:this.selectedUsers})
  }
  deSelectUser(event){
    this.selectedUsers =  this.selectedUsers.filter( (user: any) => { return user!=event.user_id});
    this.newAppointmentForm.patchValue({user_id:this.selectedUsers})
    // console.log('de event',this.selectedUsers)
  }

  selectLead(event){
    this.selectedLeads.push(event.lead_id);
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads});
  }
  deSelectLead(event){
    this.selectedLeads =  this.selectedLeads.filter( (lead: any) => { return lead!=event.lead_id});
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads})
  }

  //All
  selectUserAll(event){

    this.selectedUsers.push(event.user_id) 
     this.newAppointmentForm.patchValue({user_id:this.selectedUsers})
  }

  deSelectUserAll(event){
    this.selectedUsers =  this.selectedUsers.filter( (user: any) => { return user!=event.user_id});
    this.newAppointmentForm.patchValue({user_id:this.selectedUsers})
  }

  selectLeadAll(event){
    this.selectedLeads.push(event.lead_id);
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads});

  }

  deSelectLeadAll(event){
    this.selectedLeads =  this.selectedLeads.filter( (lead: any) => { return lead!=event.lead_id});
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads})

  }



  onSubmit() {
    if (this.newAppointmentForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addNewAppointment();
    } else {
      this.editAppointment();
    }
   
  };


  get f() {
    return this.newAppointmentForm.controls;
  };
}
