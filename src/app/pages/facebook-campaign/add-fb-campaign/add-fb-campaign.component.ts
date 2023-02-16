import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacebookCampaignService } from '../facebook-campaign.service';

@Component({
  selector: 'app-add-fb-campaign',
  templateUrl: './add-fb-campaign.component.html',
  styleUrls: ['./add-fb-campaign.component.scss']
})
export class AddFbCampaignComponent implements OnInit {
  fbCampaignForm!: FormGroup;
  campaignObjectives: any = [];

  constructor(
    private fbCampaignService: FacebookCampaignService,
    private formBulider: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.fbCampaignForm = this.formBulider.group({
      name: [null, Validators.required],
      objective:[],
      status:[],
      special_ad_categories:[],
      account_id:[]
    });
  }

  onSubmit(){

  }

  addNewCampaign(){
    this.fbCampaignService.addCampaign(this.fbCampaignForm.value).subscribe( (res: any) => {
      console.log(res)
    })
  }

  getCampaignObjectives(){
    this.fbCampaignService.getCampaignObjectives().subscribe( (res: any) => {
      console.log(res)
      // this.campaignObjectives = res ['data'];
    })
  }

  get f() {
    return this.fbCampaignForm.controls;
  };

}
