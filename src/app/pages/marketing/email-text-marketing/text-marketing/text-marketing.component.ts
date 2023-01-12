import { Component, OnInit } from '@angular/core';
import { TextMarketingService } from './text-marketing.service';

@Component({
  selector: 'app-text-marketing',
  templateUrl: './text-marketing.component.html',
  styleUrls: ['./text-marketing.component.scss']
})
export class TextMarketingComponent implements OnInit {
  marketingList:any=[]

  constructor(public textservice:TextMarketingService) { }

  ngOnInit(): void {
    this.getMarketing()
  }
  getMarketing(){
    this.textservice.getMarketing().subscribe((data:any)=>{ 
      this.marketingList = data['campaign']
      console.log('this.marketingList',this.marketingList);
      
    })

  }

}
