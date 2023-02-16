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
  p: number = 1;
  
  constructor(
    public fbCampaignService: FacebookCampaignService,
  ) { }

  ngOnInit(): void {
   this.getAllCampaign()
  }

  getAllCampaign(){
    this.fbCampaignService.getCampaign().subscribe( (res: any) => {
      this.fbCampaignList = res['body']['data']['data'];
      console.log(this.fbCampaignList)
    })
  }


  pageChangeEvent(event: number){
    this.p = event;
  }
  
}
