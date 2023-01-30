import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AddEmailService {
  constructor(private httpClient: HttpClient) {}
  addCampaign(data: any){
    return this.httpClient.post(`${environment.marketingApiUrl}${'campaign'}`,JSON.stringify(data))
   }
   getGroupData(){
     return this.httpClient.get(`${environment.marketingApiUrl}${'group'}`)
   }
   saveCampaigns(data:any){
     return this.httpClient.post(`${environment.marketingApiUrl}${'save-campaign'}`,JSON.stringify(data))
   }
   updateLeads(id:any,data:any){
     return this,this.httpClient.put(`${environment.marketingApiUrl}${'update-campaign'}/${id}`,JSON.stringify(data))
 
   }
   GetMarketing(id:any){
     return this,this.httpClient.get(`${environment.marketingApiUrl}${'get-campaign-data'}/${id}`)
 
   }
}
