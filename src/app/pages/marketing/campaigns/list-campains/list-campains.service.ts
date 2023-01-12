import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';



@Injectable({
  providedIn: 'root'
})
export class ListCampainsService {

  constructor(private httpClient: HttpClient) {}
  public listCampaign() {
    return this.httpClient.get(`${environment.apiUrl}${'campaign'}`);
  }
  getGroupData(){
    return this.httpClient.get(`${environment.apiUrl}${'group'}`)
  }
   saveCampaigns(data:any){
    return this.httpClient.get(`${environment.apiUrl}${'save-campaign'}`,data)
  }
  deleteMarketing(id:any){

  }
  updateLeads(id:any,data:any){
    return this,this.httpClient.post(`${environment.apiUrl}${'update-campaign'}/${id}`,data)

  }
}
