import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';


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
    return this.httpClient.get(`${environment.apiUrl}${'leads'}`);
  }

  public addLead(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'leads'}`, JSON.stringify(data))
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public searchLead(data: any) {
    return this.httpClient
      .get(`${environment.apiUrl}${'leads'}`,{params:data})
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updateLead(data: any, id: any) {
    return this.httpClient.put(
      `${environment.apiUrl}${'leads/'}${id}`,
      JSON.stringify(data)
    );
  }
  public deleteLead( id: any) {
    return this.httpClient.put(
      `${environment.apiUrl}${'leads_delete'}`,{leadId:id}
    );
  }

  public setData(data:any){
    this.dataSource.next(data);
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

  public getLeadById(id: string) {
    return this.httpClient.get(`${environment.apiUrl}${'leads/'}${id}`);
  }
}
