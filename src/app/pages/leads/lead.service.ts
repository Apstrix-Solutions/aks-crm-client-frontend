import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private dataSource = new BehaviorSubject<any>({});
  sub = this.dataSource.asObservable();

  createLead(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  
  public getLead() {
    return this.httpClient.get(`${environment.apiUrl}${'leads'}`,{observe: 'response'});
  }

  public addLead(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'leads'}`, JSON.stringify(data),{observe: 'response'})
      .pipe(retry(1), catchError(this.errorHandl));
  } 

  public searchLead(data: any) {
    return this.httpClient
      .get(`${environment.apiUrl}${'leads'}`,{params:data, observe: 'response'})
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updateLead(data: any, id: any) {
    return this.httpClient.put(
      `${environment.apiUrl}${'leads/'}${id}`,
      JSON.stringify(data),
      {observe: 'response'}
    );
  }
  public deleteLead(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'leads_delete/'}${id}`);
  }

  public setData(data: any) {
    this.dataSource.next(data);
  }

  public leadStatus() {
    return this.httpClient.get(`${environment.apiUrl}${'status_all'}`);
  }

  public leadSource() {
    return this.httpClient.get(`${environment.apiUrl}${'lead_source_all'}`);
  }


  public getLeadById(id: string) {
    return this.httpClient.get(`${environment.apiUrl}${'lead_details/'}${id}`);
  }

  public getLeadAddressByLeadId(id: string) {
    return this.httpClient.get(`${environment.apiUrl}${'lead_address/'}${id}`);
  }

  public getLeadSocialsByLeadId(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'lead_social/'}${id}`);
  }

  public importLead(file: any){
    return this.httpClient.post(`${environment.apiUrl}${'lead_csv'}`,file);
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
