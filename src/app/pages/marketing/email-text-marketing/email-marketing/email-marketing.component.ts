import { Component, OnInit } from '@angular/core';
import { TextMarketingService } from '../text-marketing/text-marketing.service';

@Component({
  selector: 'app-email-marketing',
  templateUrl: './email-marketing.component.html',
  styleUrls: ['./email-marketing.component.scss']
})
export class EmailMarketingComponent implements OnInit {
  marketingList:any=[]


  constructor(public textservice:TextMarketingService) { }

  ngOnInit(): void {
  }
  getMarketing(){
    this.textservice.getMarketing().subscribe((data:any)=>{
      this.marketingList = data['campaign']
      console.log('this.marketingList',this.marketingList);
      
    })

  }

}
