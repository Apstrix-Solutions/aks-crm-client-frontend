import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '@app/pages/leads/lead.service';

@Component({
  selector: 'app-quick-lead',
  templateUrl: './quick-lead.component.html',
  styleUrls: ['./quick-lead.component.scss']
})
export class QuickLeadComponent implements OnInit {
  newLeadForm!: FormGroup;

  constructor(
    private formBulider: FormBuilder,
    public toastr: ToastrService,
    private leadService: LeadService
  ) { }

  ngOnInit(): void {

    this.newLeadForm = this.formBulider.group({
      firstName: [null, [Validators.required]],
      lastName:[null, [Validators.required]],
      title:[null],
      primaryNumber: ['',[ 
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(12),
        Validators.minLength(10),
      ]],
      secondaryNumber: ['',[ Validators.pattern("^[0-9]*$"),
      Validators.maxLength(12),
      Validators.minLength(10),
    ]],
      email: [null, [Validators.required, Validators.email]],
    },
    {
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

  }

  addLead() {
    this.leadService.addLead(this.newLeadForm.value).subscribe((res) => {
      
      if (res['body']['code'] == 200) {
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['body']['error'], 'Error!');
      }
    });
  }

  onSubmit(){
    this.addLead();
  }

  get f() {
   return  this.newLeadForm.controls;
  }


}
