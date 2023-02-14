import { Component,NgZone, OnInit } from '@angular/core';
import { FacebookCampaignService } from '../facebook-campaign.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-fb-campaign',
  templateUrl: './list-fb-campaign.component.html',
  styleUrls: ['./list-fb-campaign.component.scss']
})
export class ListFbCampaignComponent implements OnInit {
  fbCampaignList: any  = [];
  
  constructor(
    public fbCampaignService: FacebookCampaignService,
  ) { }

  ngOnInit(): void {

   
  }

  getAllCampaign(){
    this.fbCampaignService.getCampaign().subscribe( (res: any) => {
      console.log(res);
      
      // this.fbCampaignList = res['data'];
    })
  }

  open(content, campaignId) {
    if (confirm('Are you sure to delete ?')) {
      
    }
  }
  
}
