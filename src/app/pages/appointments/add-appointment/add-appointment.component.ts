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
      agencyId:[null],
      comment: [null],
      meet_link:[null, Validators.required],
      // meet_link: [null, Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      status: [null, Validators.required],
      location: [null, Validators.required],
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
    this.leadService.getLead().subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      const leadData = data['body']['data']['leads'];
      leadData.forEach((lead: any) => { this.leadIds.push( {lead_id:lead.id,name:lead.firstName} ) });
      this.leadDropdownList = this.leadIds;
      console.log(this.leadIds)
      this.leadDropdownSettings = {
        idField: 'lead_id',
        textField: 'name',
      };
    });

    this.getAppointment();
    
  }

  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }


  addNewAppointment() {
    this.appointmentService.createAppointment(this.newAppointmentForm.value).subscribe( (res) => {
      if (res['body']['code'] == 200) {
        this.ngZone.run(() => this.router.navigateByUrl(`list-appointments/${this.agencyId}`));
        this.toastr.success(res['message'],'Successfully created the contact');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }

  editAppointment() {
    const id = this.newAppointmentForm.value.id
    this.appointmentService.updateAppointment(this.newAppointmentForm.value,id).subscribe( (res) => {
      if (res['body']['code'] == 200) {
        // this.ngZone.run(() => this.router.navigateByUrl(`list-appointments/${this.id}`));
        this.toastr.success(res['message'],'Successfully updated the contact');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }

  getAppointment(){
    console.log('form to edit',this.newAppointmentForm.value)

    this.appointmentService.getAppointment(this.id).subscribe( (res) => {
      this.appointmentListById = res['body']['data']['data'];

      console.log('appointmentListById',this.appointmentListById)
      this.selectUser(this.appointmentListById.Appointment_user);
      this.selectLead(this.appointmentListById.Appointments_lead);

      const data = this.appointmentListById
      this.newAppointmentForm.patchValue({data})
    })
  }
 
  selectUser(event){
     this.selectedUsers.push(event.user_id) 
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
