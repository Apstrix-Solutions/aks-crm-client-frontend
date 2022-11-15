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
  refreshToken: string;

  constructor(
    private formBulider: FormBuilder,
    private leadService: LeadService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) { }
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
  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }
  addLead() {
    this.leadService.addLead(this.newLeadForm.value).subscribe((res) => {
      this.refreshToken = res.headers.get('refresh_token');
      if (res['body']['code'] == 200) {
        this.getLeads();
        this.closebutton.nativeElement.click();
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['errorMessage'], 'Error!');
      }
    });
  }
  goToFullForm() { //change the value of the BehaviorSubject with newLeadForm.
    this.leadService.setData(this.newLeadForm.value);
  }

  searchLead() {
    const leadForm = this.newLeadForm.value;

    let queryParams = new HttpParams();
    const keys = Object.keys(leadForm);

    keys.forEach((key, index) => {
      queryParams = queryParams.append(key, leadForm[key]);
    });

    this.leadService.searchLead(queryParams).subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      this.leadsList = data['body']['data']['leads'];
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
      this.refreshToken = data.headers.get('refresh_token');
      this.leadsList = data['body']['data']['leads'];
    });
  }

}
