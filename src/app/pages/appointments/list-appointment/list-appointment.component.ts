import { Component, OnInit,NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss']
})
export class ListAppointmentComponent implements OnInit {
  id:any;
  agencyId:any;
  appoinmentsList:any = [];

  constructor(
    private appointmentService: AppointmentService,
    public toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.agencyId = localStorage.getItem('AgencyId')


    this.getAllAppointmentsByAgencyId();
    console.log('this.agencyId',this.agencyId)
  }

  getAllAppointmentsByAgencyId(){
    this.appointmentService.getAllAppointmentsByAgencyId(this.agencyId).subscribe((res) => {
      console.log(res)
      this.appoinmentsList = res['body']['data']['data']
    })

  }

  goBack() {
    this.ngZone.run(() => this.router.navigateByUrl(`add-appointments`));
  }


  open(content, appoinmentId) {
    if (confirm('Are you sure to delete ?')) {
      this.appointmentService.deteteAppointment(appoinmentId).subscribe((res) => {
        this.getAllAppointmentsByAgencyId();
        // console.log(res)

        if (res['body']['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }


}
