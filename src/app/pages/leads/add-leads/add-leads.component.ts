import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.scss'],
})
export class AddLeadsComponent implements OnInit {
  newAddLeadForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  addLeadListById: any = [];
  addLeadsList: any;
  addLeadService: any;
  recievedData: any = {};
  lStatus: any = [];
  lSource: any = [];


  constructor(
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private leadService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.newAddLeadForm = this.formBulider.group({
      title: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      primaryNumber: [null, [Validators.required]],
      secondaryNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      leadSource: [null, [Validators.required]],
      leadStatus: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      website: [null, [Validators.required]],
      linkedin: [null, [Validators.required]],
      facebook: [null, [Validators.required]],
      background_info: [null, [Validators.required]],
    });
    //recieving data
    //A subscription is made to listen to changes in the BehaviorSubject.
    this.leadService.sub.subscribe(
      response => {
        this.id = response.id        
        this.recievedData = response;
        this.newAddLeadForm.patchValue(this.recievedData)
        // console.log('received data',this.newAddLeadForm.value);
        
    });
    this.leadStatus();
    this.leadSource();
  }

  addLeads() {
    this.leadService.addLead(this.newAddLeadForm.value).subscribe((res) => {
      if (res['code'] == 200) {
        this.toastr.success(res['message'], 'Success!');
        this.ngZone.run(() => this.router.navigateByUrl('/leads'));
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    });
  }

  updateLeads() {
    this.leadService
      .updateLead(this.newAddLeadForm.value,this.id)
      .subscribe((res) => {
        if (res['code'] == 200) {
          this.ngZone.run(() => this.router.navigateByUrl('/leads'));
          this.toastr.success(res['message'], 'Successfully updated!');
        } else {
          this.toastr.error(res['message'], 'Error!');
        }
      });
  }

  leadStatus(){
    this.leadService.leadStatus().subscribe((res) => {
      this.lStatus = res['data']['status']
    })
  }

  leadSource(){
    this.leadService.leadSource().subscribe((res) => {
      this.lSource = res['data']['data']
    })
  }

  get f() {
    return this.newAddLeadForm.controls;
  }

  onSubmit() {
    if (this.newAddLeadForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addLeads();
    } else {
      this.updateLeads();
    }
  }
}
