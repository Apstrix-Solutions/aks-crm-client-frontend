import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { co } from '@fullcalendar/core/internal-common';
import { FacebookCampaignService } from '../facebook-campaign.service';

@Component({
  selector: 'app-campaign-add-set',
  templateUrl: './campaign-add-set.component.html',
  styleUrls: ['./campaign-add-set.component.scss']
})
export class CampaignAddSetComponent implements OnInit {
  fbCampaignSetForm!: FormGroup;
  bidAmount: number = 2;
  facebookPosition: string = 'feed';
  defaultStatus: string = 'PAUSED';
  publisher_platforms: any = [
      "facebook",
      "instagram",
      "messenger",
      "audience_network"
  ]
  statusList: any = ['PAUSED'];
  showRegion: boolean = false;

  constructor(
    private fbCampaignService: FacebookCampaignService,
    private formBulider: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fbCampaignSetForm = this.formBulider.group({
      name: [null, Validators.required],
      optimization_goal:[null, Validators.required],
      account_id: [null, Validators.required],
      billing_event:[null, Validators.required],
      bid_amount:[this.bidAmount, Validators.required],
      daily_budget:[null, Validators.required],
      campaign_id:[null, Validators.required],
      promoted_object:[null, Validators.required],
      targeting:[null, Validators.required],
      status:[null, Validators.required],
      start_time:[null, Validators.required],
      end_time:[null, Validators.required]
    });

    this.fbCampaignSetForm.controls['status'].setValue(this.defaultStatus);
  }

  onSubmit(){

  }

  get f() {
    return this.fbCampaignSetForm.controls;
  };

  /**
   * for toggle region input field
   */

  onRegionSelected(value:string){
    this.showRegion = false;
    
    if(value == 'region') {
      this.showRegion = true;
    }
  }
}
