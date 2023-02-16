import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  constructor(private httpClient: HttpClient) {}


  getWorkflow(){
    return this.httpClient.get(`${environment.apiUrl}${'worksflows_all'}`, {observe: 'response'});
  };

  getWorkflowById(id: any){
    return this.httpClient.get(`${environment.apiUrl}${'workflows/'}${id}`,{observe: 'response'});
  }

  addWorkflow(data: any){
    return this.httpClient.post(`${environment.apiUrl}${'workflows'}`, data, {observe: 'response'});
  };

  updateWorkflow(id: any, data: any){
    return this.httpClient.put(`${environment.apiUrl}${'workflows/'}${id}`,data,{observe: 'response'});
  }

  deleteWorkflow(id: any){
    return this.httpClient.put(`${environment.apiUrl}${'workflows_delete/'}${id}`,{observe: 'response'});
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
