import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TextMarketingService {

  constructor(private httpClient: HttpClient) { }
  addCampaign(data: any){
   return this.httpClient.post(`${environment.apiUrl}${'campaign'}`,JSON.stringify(data))
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
  getMarketing(){
    return this.httpClient.get(`${environment.apiUrl}${'get-campaign'}`)

  }
  
}
