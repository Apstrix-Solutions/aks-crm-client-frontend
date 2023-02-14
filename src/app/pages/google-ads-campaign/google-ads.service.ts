import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAdsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllCampaign() {
    return this.httpClient.get(`${environment.apiUrl}${''}`);
  } 

  // addCampaign() {
  //   return this.httpClient.post(`${environment.apiUrl}${''}`,)
  // }
}