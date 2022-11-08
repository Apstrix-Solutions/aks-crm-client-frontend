import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.scss'],
})
export class ListLeadsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  newLeadForm!: FormGroup;
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
    this.getLeads();

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
    this.leadService.addLead(this.newLeadForm.value).subscribe((res) => {
      if (res['code'] == 200) {
        this.getLeads();
        this.closebutton.nativeElement.click();
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['errorMessage'], 'Error!');
      }
    });
    this.leadService.setData(this.newLeadForm.value);

  }

  searchLead() {
    console.log('this.newLeadForm.value',this.newLeadForm.value)
    const leadForm  = this.newLeadForm.value;
    let queryParams = new HttpParams();

    const keys = Object.keys(leadForm);

    keys.forEach((key, index) => {
      console.log(`${key}=${leadForm[key]}`);
      queryParams = queryParams.append(key,leadForm[key]);
    });
    console.log('queryParams',queryParams)
    
    this.leadService.searchLead(queryParams).subscribe((data) =>{
       console.log('response',data);
       this.leadsList = data['data']['users'];
      });
  }
  get f() {
    return this.newLeadForm.controls;
  }

  onSubmit() {
    if (this.newLeadForm.invalid) {
      return;
    }
    this.addLead();
  }

  getLeads() {
    this.leadService.getLead().subscribe((data) => {
      this.leadsList = data['data']['users'];
    });
  }
}
