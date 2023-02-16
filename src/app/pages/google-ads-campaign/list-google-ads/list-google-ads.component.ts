import { Component, OnInit } from '@angular/core';
import { GoogleAdsService } from '../google-ads.service';

@Component({
  selector: 'app-list-google-ads',
  templateUrl: './list-google-ads.component.html',
  styleUrls: ['./list-google-ads.component.scss']
})
export class ListGoogleAdsComponent implements OnInit {
  campaignList:any = [];


  constructor() { }

  ngOnInit(): void {
  }

  getCampaign(){
    this
  }

}
