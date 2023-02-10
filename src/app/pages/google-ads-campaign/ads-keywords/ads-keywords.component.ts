import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads-keywords',
  templateUrl: './ads-keywords.component.html',
  styleUrls: ['./ads-keywords.component.scss']
})
export class AdsKeywordsComponent implements OnInit {
  showBudget: boolean= false;

  constructor() { }

  ngOnInit(): void {
  }

}
