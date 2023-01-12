import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AddCampainsService {

  constructor(private httpClient: HttpClient) { }
  addCampaign(data: any){
   return this.httpClient.post(`${environment.apiUrl}${'campaign'}`,JSON.stringify(data))
  }
  getGroupData(){
    return this.httpClient.get(`${environment.apiUrl}${'group'}`)
  }
  saveCampaigns(data:any){
    return this.httpClient.post(`${environment.apiUrl}${'save-campaign'}`,JSON.stringify(data))
  }
  updateLeads(id:any,data:any){
    return this,this.httpClient.post(`${environment.apiUrl}${'update-campaign'}/${id}`,JSON.stringify(data))

  }
  GetMarketing(id:any){
    return this,this.httpClient.get(`${environment.apiUrl}${'get-campaign-data'}/${id}`)

  }

  
  // errorHandl(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
  
}
