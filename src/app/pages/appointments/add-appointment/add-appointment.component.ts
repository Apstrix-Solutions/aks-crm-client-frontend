import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '@app/pages/leads/lead.service';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  newAppointmentForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  refreshToken: string;
  appointmentList: any = [];
  appointmentListById: any = [];
  leadIds: any = [];
  userIds: any = [];

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
    this.newAppointmentForm = this.formBulider.group({
      subject: [null, Validators.required],
      lead_id: [null, Validators.required],
      user_id: [null, Validators.required],
      comment: [null],
      meet_link: [null, Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      status: [null, Validators.required],
      location: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required]
    });

    this.getLeads();
    this.getUsers();
  }

  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }





  addNewAppointment() {
    this.ngZone.run(() => this.router.navigateByUrl(`list-appointments/${this.id}`));
  }
  //get all leadIds
  getLeads() {
    this.leadService.getLead().subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      const leadData = data['body']['data']['leads'];
      this.leadIds = leadData.map((lead: any) => { return lead.id })
    });
  }
  //users under agencyId
  getUsers() {
    this.leadService.getAllUserDetails().subscribe((data) => {
      const userData = data['body']['data']['data']
      this.userIds = userData.map((user: any) => { return user.id })
    })
  }


  onSubmit() {
    // if (this.newAppointmentForm.invalid) {
    //   return;
    // }
    this.addNewAppointment();
    console.log(this.newAppointmentForm.value)

  };


  get f() {
    return this.newAppointmentForm.controls;
  };
}
