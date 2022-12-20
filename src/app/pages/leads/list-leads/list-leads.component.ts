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
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.scss'],
})
export class ListLeadsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  newLeadForm!: FormGroup;
  newSearchForm!: FormGroup;
  leadListById: any = [];
  leadsList: any = [];
  refreshToken: string;
  editLeadsList: any = {};
  leadId: number;
  closeResult: string;
  convertedLeads = [];
  isConverted: any = false;
  contactsList:any  = [];
  leadID: any  ;
  

  constructor(
    private formBulider: FormBuilder,
    private leadService: LeadService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllCustomer();
    this.getLeads();

    this.newLeadForm = this.formBulider.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      title: [null, [Validators.required]],
      primaryNumber: [null, [Validators.required]],
      secondaryNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });

    this.newSearchForm = this.formBulider.group({
      firstName: [null],
      lastName: [null],
      title: [null],
      primaryNumber: [null],
      secondaryNumber: [null],
      email: [null],
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
        this.newLeadForm.patchValue({firstName : null, lastName: null, title: null, primaryNumber: null, secondaryNumber: null, email: null});
      } else {
        this.toastr.error(res['errorMessage'], 'Error!');
      }
    });
  }
  goToFullForm() {
    //change the value of the BehaviorSubject with newLeadForm.
    this.leadService.setData(this.newLeadForm.value);
  }

  searchLead() {
    const leadForm = this.newSearchForm.value;
    let queryParams = new HttpParams();
    const keys = Object.keys(leadForm);

    keys.forEach((key, index) => {
      if (leadForm[key] != null) {
        queryParams = queryParams.append(key, leadForm[key]);
      }
    });

    this.leadService.searchLead(queryParams).subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      this.leadsList = data['body']['data']['leads'];
    });
  }
  

  getLeads() {
    
    this.leadService.getLead().subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      const leadData =  data['body']['data']['leads'];
      console.log('leadData',leadData);
      
      
      if( leadData.length!=0 && this.contactsList.length!=0 ){
        this.contactsList.forEach( contact =>{
          leadData.forEach( (lead: any) =>{
            if(contact.lead_id === lead.id){
              lead['customer'] = true;
            }
          })
        })
        this.leadsList = leadData;
      }else{
        this.leadsList = data['body']['data']['leads'];
      }

    });
  }

  editLeads(list: any) {
    this.ngZone.run(() => this.router.navigateByUrl(`add-lead/${list.id}`));
  }

  customerConversion(leadId: any){
    
    this.leadService.customerConversion(leadId).subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      if(data['code']==200){
        this.convertedLeads.push(leadId)
        // console.log('convereted leads',this.convertedLeads)
        this.toastr.success(data['message'], 'Success!');
        this.leadService.leadStatusUpdate(leadId).subscribe((data) => {
          console.log(data)
        })
      }
      else  if(data['code']==500){
        this.toastr.error(data['error'],'Error!')
      }
    })
  }

  getAllCustomer(){
    this.leadService.getAllCustomer().subscribe( (data) =>{
      this.refreshToken = data.headers.get('refresh_token');
       this.contactsList = data['body']['data']['data'];
       console.log('contactsList',this.contactsList)
    })
  }



  open(content, listId) {
    if (confirm('Are you sure to delete ?')) {
      this.leadService.deleteLead(listId).subscribe((res) => {
        this.refreshToken = res.headers.get('refresh_token');
        this.getLeads();

        if (res['body']['code'] == 200) {
          this.toastr.success('Lead has been deleted successfully', 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

  onSubmit() {
    if (this.newLeadForm.invalid) {
      return;
    }
    this.addLead();
  }

  get f() {
    return this.newLeadForm.controls;
  }
}
