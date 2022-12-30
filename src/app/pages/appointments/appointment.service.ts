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
    console.log('data',data)
    return this.httpClient.post(`${environment.apiUrl}${'appointment'}`, data, {observe: 'response'})
  }

  updateAppointment(data: any, id: any){
    return this.httpClient.put(`${environment.apiUrl}${'appointment-edit/'}${id}`,data, {observe:'response'})
  }

  getAppointment(id: any){
    return this.httpClient.get(`${environment.apiUrl}${'appointment/'}${id}`, {observe: 'response'})
  }

  getAllAppointmentsByAgencyId(agencyId: any){
    return this.httpClient.get(`${environment.apiUrl}${'appointment-agency-all/'}${agencyId}`, {observe: 'response'})
  }

  deteteAppointment(id:any){
    return this.httpClient.put(`${environment.apiUrl}${'appointment-delete/'}${id}`,{observe: 'response'})
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
