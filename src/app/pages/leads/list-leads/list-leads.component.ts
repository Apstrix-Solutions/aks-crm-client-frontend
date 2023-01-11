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
  customerList:any  = [];
  leadID: any  ;
  statusName:any;
  AgencyId:any;

  agencyId:any ;
  

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

    this.agencyId = localStorage.getItem('AgencyId');

    this.getAllCustomer();
    this.getLeads();

    this.newLeadForm = this.formBulider.group({
      agencyId:[null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      title: [null],
      primaryNumber: ['', [
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(12),
          Validators.minLength(10),
        ]
      ],
      secondaryNumber: ['', [
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(12),
          Validators.minLength(10),
        ]
      ],
      email: [null, [Validators.required, Validators.email]],
    }, {
      validators: [phoneConditionallyRequiredValidator, mobileConditionallyRequiredValidator] 
  });

  function phoneConditionallyRequiredValidator(formGroup: FormGroup) {
    if (formGroup.value.primaryNumber) {
      return Validators.required(formGroup.get('primaryNumber')) ? {
        phoneConditionallyRequiredValidator: true,
      } : null;
    }
    return null;
  }

  function mobileConditionallyRequiredValidator(formGroup: FormGroup) {
    if (formGroup.value.secondaryNumber) {
      return Validators.required(formGroup.get('secondaryNumber')) ? {
        mobileConditionallyRequiredValidator: true,
      } : null;
    }
    return null;
  }

    this.newSearchForm = this.formBulider.group({
      firstName: [null],
      lastName: [null],
      title: [null],
      primaryNumber: [null],
      secondaryNumber: [null],
      email: [null],
    });

    // this.AgencyId = localStorage.getItem('AgencyId');
    this.newLeadForm.patchValue({agencyId:this.agencyId});
    
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
        // this.newLeadForm.patchValue({firstName : '', lastName: '', title: '', primaryNumber: '', secondaryNumber: '', email: ''});
         this.newLeadForm = this.formBulider.group({
          firstName: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          title: [null],
          primaryNumber: [null],
          secondaryNumber: [null],
          email: [null, [Validators.required, Validators.email]],
          });
      } else {
        this.toastr.error(res['body']['error'], 'Error!');
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
      const leadByAgencyId = data['body']['data']['leads'];
      const leadData = leadByAgencyId.filter((data)=> {return data.agencyId==this.agencyId });
      console.log('leadData',leadData);

       leadData.forEach((lead:any)=>{
        if(lead.currentStatus){
          this.leadService.getStatusById(lead.currentStatus).subscribe(res => {
            const status = res['body']['data']['status']
            status ? lead['currentStatusName']=status.name:'';
          })
        }
        })
      
      if( leadData.length!=0 && this.customerList.length!=0 ){
        this.customerList.forEach( contact =>{
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

      if(data['body']['code']==200){

        this.convertedLeads.push(leadId)
        this.leadService.leadStatusUpdate(leadId).subscribe((data) => {
          if(data['body']['code']== 200){
            this.toastr.success(data['message'], 'Success!');
            this.getLeads();
          }
        })
      }
      else  if(data['body']['code']==500){
        this.toastr.error(data['error'],'Error!')
      }
    })
  }
  

  getAllCustomer(){
    this.leadService.getAllCustomer().subscribe( (data) =>{
      this.refreshToken = data.headers.get('refresh_token');
       this.customerList = data['body']['data']['data'];
      //  console.log('customerList',this.customerList)
    })
  }

  getStatusById(statusId:any){
    this.leadService.getStatusById(statusId).subscribe(res => {
      const status = res['body']['data']['status']
       this.statusName = status.name;
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

  reset(){
    this.getLeads();
    this.newSearchForm.patchValue({ firstName: '', lastName: '', title: '', primaryNumber: '', secondaryNumber: '', email: '' })
  }

  clearForm(){
    this.newSearchForm.patchValue({ firstName: '', lastName: '', title: '', primaryNumber: '', secondaryNumber: '', email: '' })
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
