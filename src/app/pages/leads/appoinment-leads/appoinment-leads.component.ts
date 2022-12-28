import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-appoinment-leads',
  templateUrl: './appoinment-leads.component.html',
  styleUrls: ['./appoinment-leads.component.scss']
})
export class AppoinmentLeadsComponent implements OnInit {
  id:any;
  appoinmentsList:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private leadService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllAppointments();
  }

  getAllAppointments(){
    this.leadService.getAllAppoinmentsById(this.id).subscribe((res) => {
      this.appoinmentsList = res['body']['data']['data'];
      console.log('res',this.appoinmentsList)
    })
  }



  goBackToLead() {
    this.ngZone.run(() => this.router.navigateByUrl(`view-lead/${this.id}`));
  }


  open(content, appoinmentId) {
    if (confirm('Are you sure to delete ?')) {
      this.leadService.deleteAppoinments(appoinmentId).subscribe((res) => {
        this.getAllAppointments();

        if (res['body']['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }



}
