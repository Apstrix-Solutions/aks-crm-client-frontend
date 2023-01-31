import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListEmailService {

  constructor(private httpClient: HttpClient) { }
  addCampaign(data: any){
   return this.httpClient.post(`${environment.marketingApiUrl}${'campaign'}`,JSON.stringify(data))
  }
 
  getMarketing(){
    return this.httpClient.get(`${environment.marketingApiUrl}${'get-campaign'}`)

  }
  deleteMarketing(id:any){
    return this.httpClient.delete(`${environment.marketingApiUrl}${'remove-campaign-data/'}${id}`)

  }
  }
