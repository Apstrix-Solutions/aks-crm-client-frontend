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

    this.getAllAppoinmentsById();
  }

  getAllAppoinmentsById(){
    // this.leadService.getAllAppoinmentsById(this.id).subscribe((res) => {
    //   this.appoinmentsList = res['body']['data']['data'];
    // })
  }

  editAppointment(appoinmentId: any){

  }

  goBack() {
    this.ngZone.run(() => this.router.navigateByUrl(`add-appointments/${24}`));
  }


  open(content, appoinmentId) {
    if (confirm('Are you sure to delete ?')) {
      // this.leadService.deleteAppoinments(appoinmentId).subscribe((res) => {
      //   this.getAllAppoinmentsById();

      //   if (res['body']['code'] == 200) {
      //     this.toastr.success(res['message'], 'Success!');
      //   } else {
      //     this.toastr.error(res['errorMessage'], 'Error!');
      //   }
      // });
    }
  }


}
