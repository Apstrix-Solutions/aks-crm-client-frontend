import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent implements OnInit {
  campaignForm!: FormGroup;
 


  constructor(
    private formBulider: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.campaignForm = this.formBulider.group({
      name:[null,Validators.required],
      startDate:[null],
      endDate:[null],
      startTime:[null],
      endTime:[null],
      targetAudience:[null],
      currencies:[null],
      budgets:[null]
    });
  }

  onSubmit(){

  }

  get c() {
    return this.campaignForm.controls;
  }


}
