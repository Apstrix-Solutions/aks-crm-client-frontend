import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  createAppointment(data: any){
    return this.httpClient.post(`${environment.apiUrl}${''}`, JSON.stringify(data), {observe: 'response'})
  }

  updateAppointment(data: any, id: any){
    return this.httpClient.put(`${environment.apiUrl}${'/'}${id}`,JSON.stringify(data), {observe:'response'})
  }

  getAllAppointment(){
    return this.httpClient.get(`${environment.apiUrl}${''}`, {observe: 'response'})
  }

  getAllAppointmentsByLeadId(leadId: any){
    return this.httpClient.get(`${environment.apiUrl}${'/'}${leadId}`, {observe: 'response'})
  }

  deteteAppointment(){
    return this.httpClient.put(`${environment.apiUrl}${''}`,{observe: 'response'})
  }


  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

}
