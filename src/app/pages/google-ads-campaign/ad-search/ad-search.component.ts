import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['./ad-search.component.scss']
})
export class AdSearchComponent implements OnInit {
  showSettings: boolean  = false;
  DisplayNetImg  = '../../../../assets/img/google-ads-images/display-network.png';
  SearchNetImg  = '../../../../assets/img/google-ads-images/search-network.png'
  Languages :any = [];

  constructor() { }

  ngOnInit(): void {
    this.Languages = [
      {id:1,lang:'English'},
      {id:2, lang: 'Malayalam'}
    ]
  }

  goToNext(){
    this.showSettings = true;

  }

}
