import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { LeadService } from '../lead.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.scss'],
})
export class ListLeadsComponent implements OnInit {
  newLeadForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  leadListById: any = [];
  leadsList: any = [];

  constructor(
    private formBulider: FormBuilder,
    private leadService: LeadService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.leadService.getLead().subscribe((data) => {
      let response = data;
      console.log('ddd', data);
      this.leadsList = response['data']['users'];
      console.log('leadlist', this.leadsList);
    });

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.newLeadForm = this.formBulider.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      title: [null, [Validators.required]],
      primaryNumber: [null, [Validators.required]],
      secondaryNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }
  addLead() {
    //  return
    console.log('addLeads data', this.newLeadForm.value);
    this.leadService.addLead(this.newLeadForm.value).subscribe((res) => {
      if (res['code'] == 200) {
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
      this.ngZone.run(() => this.router.navigateByUrl('/leads'));
    });
  }

  searchLead() {
    this.leadService.searchLead(this.newLeadForm.value).subscribe((res) => {
      if (res['code'] == 200) {
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
      this.ngZone.run(() => this.router.navigateByUrl('/leads'));
    });
  }

  updateAgency() {
    this.leadService
      .updateLead(this.newLeadForm.value, this.id)
      .subscribe((res) => {
        if (res['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['message'], 'Error!');
        }
        this.ngZone.run(() => this.router.navigateByUrl('/leads'));
      });
  }

  get f() {
    return this.newLeadForm.controls;
  }

  onSubmit() {
    if (this.newLeadForm.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.addLead();
    } else {
      this.updateAgency();
    }
  }
}
