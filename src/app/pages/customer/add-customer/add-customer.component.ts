import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { conditionalExpression } from '@babel/types';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  newCustomerForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  customerList: any = [];
  customerListById: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = ! this.id;

    const AgencyId = localStorage.getItem('AgencyId')

    this.newCustomerForm = this.formBuilder.group({
      leadId:[null],
      customerName:[null,Validators.required],
      field:[null,Validators.required],
      agencyId:[AgencyId],

    });

    if(this.id){
      this.getCustomerById(this.id);
    }

  }

  onSubmit(){
    if (this.newCustomerForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addCustomer();
    } else {
      this.updateCustomer();
    }
  }

  getCustomerById(customerId: any){
    this.customerService.getCustomerById(customerId).subscribe((res) => {
      const customer = res['body']['data']['data'];
      this.newCustomerForm.patchValue({customerName:customer.customer_name,field:customer.field});
    })
  }

  addCustomer(){
    this.customerService.addCustomer(this.newCustomerForm.value).subscribe( (res) => {
      if(res['body']['code']==200){
        this.toastr.success(res['message'], 'Successfully created the customer')
        this.ngZone.run(() => this.router.navigateByUrl(`/list-customer`) );
      }
    })
  }

  updateCustomer(){
    this.customerService.updateCustomer(this.newCustomerForm.value,this.id).subscribe( (res) => {
      console.log(res)
      if(res['body']['code']=200){
        this.toastr.success(res['message'], 'Successfully updated the customer')
        this.ngZone.run(() => this.router.navigateByUrl(`/list-customer`) );
      }
    })
  }

  get f() {
    return this.newCustomerForm.controls;
  }

}
