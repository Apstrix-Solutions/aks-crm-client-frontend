import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '@app/pages/leads/lead.service';
import { AppointmentService } from '../appointment.service';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';

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
  date:any;
  currentDate: any;

  constructor(
    private appointmentService: AppointmentService,
    private leadService: LeadService,
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.agencyId = localStorage.getItem('AgencyId');
    let date: Date = new Date();  
    console.log("Date = " + date);
   
    this.currentDate =  this.datepipe.transform(date, 'yyyy-MM-dd');

    this.newAppointmentForm = this.formBulider.group({
      subject: [null, Validators.required],
      lead_id: [null, Validators.required],
      user_id: [null, Validators.required],
      agency_id:[this.agencyId],
      comment: [null],
      Regarding: [null],
      meet_link:[null, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      status: ['Pending'],
      Location: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      test:[null]
    });

    this.newAppointmentForm.patchValue({'agency_id':this.agencyId});

    //get user under agency in the dropdown
    this.leadService.getAllUserDetails().subscribe((data) => {
      const userData = data['body']['data']['data']
      // console.log('userData',userData)
      userData.forEach((user: any) => { this.userIds.push( {user_id:user.id,name:user.fullname} ) });
      this.userDropdownList = this.userIds;
    })

    //get lead in the dropdown
    this.leadService.getAgencyLeads().subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      const leadData = data['body']['data']['leads'];
      // console.log('leadData',leadData)
      leadData.forEach((lead: any) => { this.leadIds.push( {lead_id:lead.id,name:lead.firstName} ) });
      this.leadDropdownList = this.leadIds;
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
    this.newAppointmentForm.patchValue({user_id:this.selectedUsers});
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads});
    console.log('this.newAppointmentForm.value',this.newAppointmentForm.value)

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
    this.newAppointmentForm.patchValue({user_id:this.selectedUsers});
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads});
    console.log('edit appoinment form',this.newAppointmentForm.value)

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
      console.log('res------',res)

      const response = res['body']['data']['data'];
      this.appointmentListById = res['body']['data']['data'][0];
      // console.log(this.appointmentListById)

      const user = response.map( (item:any) => { return item.Appointment_users.map( u => { return u.user_id })  });
      const lead = response.map( (item:any) => { return item.Appointments_leads.map( l => { return l.lead_id })  });
      console.log(user[0])
      this.selectedUsers = user[0]
      this.selectedLeads = lead[0]
      console.log('selectedUsers',this.selectedUsers)

      // this.selectedUsers = this.selectedUsers.filter((item, index) => this.selectedUsers.indexOf(item) === index);
      // this.selectedLeads = this.selectedLeads.filter((item, index) => this.selectedLeads.indexOf(item) === index);

      // if(this.appointmentListById.Appointment_users) {
      //   let userData = this.appointmentListById.Appointment_users;

      //   for (var i = 0; i < userData.length; i++) {
      //     this.selectedUsers.push(userData[i].user_id);
      //   }
      // }

      // if(this.appointmentListById.Appointments_leads) {
      //   let leadsData = this.appointmentListById.Appointments_leads;

      //   for (var i = 0; i < leadsData.length; i++) {
      //     this.selectedLeads.push(leadsData[i].lead_id);
      //   }
      // }
      
      this.newAppointmentForm.patchValue({user_id:this.selectedUsers});
      this.newAppointmentForm.patchValue({lead_id:this.selectedLeads});

      const data = this.appointmentListById
      this.date = this.datepipe.transform(this.appointmentListById.date, 'yyyy-MM-dd');
      this.currentDate = this.date;

      this.newAppointmentForm.patchValue({
        subject: this.appointmentListById.subject,
        Regarding: this.appointmentListById.Regarding,
        meet_link: this.appointmentListById.meet_link,
        date:this.date,
        time: this.appointmentListById.time,
        status: this.appointmentListById.status,
        Location: this.appointmentListById.Location,
        comment: this.appointmentListById.comment,
      })
      // this.newAppointmentForm.patchValue({date:date});
      console.log('newAppointmentForm',this.newAppointmentForm.value)
      
    })

    
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
  selectUser(event:any){
    // console.log(event)
    console.log(this.selectedUsers)
    this.newAppointmentForm.patchValue({user_id:this.selectedUsers})
  }

  selectLead(event:any){
    // console.log(event)
    // console.log(this.selectedLeads)
    this.newAppointmentForm.patchValue({lead_id:this.selectedLeads})
  }


  get f() {
    return this.newAppointmentForm.controls;
  };
}
