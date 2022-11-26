import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}


  getAllContact(){
    return this.httpClient.get(`${environment.apiUrl}${'contacts_all'}`);
  }

  createContact(data: any){
    return this.httpClient
    .post(`${environment.apiUrl}${'contacts'}`, JSON.stringify(data))
    .pipe(retry(1), catchError(this.errorHandl));
  }

  updateContact(leadId: any, data: any){
    return this.httpClient
    .put(`${environment.apiUrl}${'contacts/'}${leadId}`,JSON.stringify(data))
    .pipe(retry(1), catchError(this.errorHandl));
  }

  deleteContact(leadId: any){
    return this.httpClient
    .put(`${environment.apiUrl}${'contacts_delete'}`,{id:leadId})
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getContactById(id:string) {
    return this.httpClient.get(`${environment.apiUrl}${'contacts/'}${id}`);
  }


  // Error handling
  errorHandl(error) {
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
