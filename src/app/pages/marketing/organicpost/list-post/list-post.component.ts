import { Component, OnInit } from '@angular/core';
import { MarketingService } from '../../marketing.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  postList: any = [];

  constructor(private MarketingService : MarketingService) { }

  ngOnInit(): void {
    this.MarketingService.getPost().subscribe((data)=>{
      let response = data;
      this.postList = response['data']['data'];
    });
  }

}
