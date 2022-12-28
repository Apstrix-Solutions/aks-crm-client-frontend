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
    return this.httpClient.get(`${environment.apiUrl}${'leads_delete/'}${id}`,{observe: 'response'});
  }

  public leadStatus() {
    return this.httpClient.get(`${environment.apiUrl}${'status_all'}`,{observe: 'response'});
  }

  public leadSource() {
    return this.httpClient.get(`${environment.apiUrl}${'lead_source_all'}`,{observe: 'response'});
  }

  public getLeadById(id: string) {
    return this.httpClient.get(`${environment.apiUrl}${'lead_details/'}${id}`,{observe: 'response'});
  }

  public getLeadAddressByLeadId(id: string) {
    return this.httpClient.get(`${environment.apiUrl}${'lead_address/'}${id}`,{observe: 'response'});
  }

  public getLeadSocialsByLeadId(id: string) {
    return this.httpClient.get(`${environment.apiUrl}${'lead_social/'}${id}`,{observe: 'response'});
  }

  public getAllCustomer(){
    return this.httpClient.get(`${environment.apiUrl}${'customer_all'}`,{observe: 'response'});
  }

  public customerConversion(leadId: string){
    return this.httpClient.post(`${environment.apiUrl}${'customerconversion'}`,{id:leadId},{observe: 'response'});
  }

  public leadStatusUpdate(leadId: any){
    return this.httpClient.put(`${environment.apiUrl}${'leads_status_update/'}${leadId}`,{currentStatus:environment.leadStatus},{observe: 'response'})
  }

  public setData(data: any) {
    this.dataSource.next(data);
  }

  public importLead(file: any){
    const formData = new FormData(); 
    formData.set("newfile",file);
    
    return this.httpClient.post(`${environment.apiUrl}${'lead-csv-upload'}`,formData,{observe: 'response'});
  }

  public getAllUserDetails(){
    const agencyId = localStorage.getItem('AgencyId')
    return this.httpClient.post(`${environment.serverUrl}${'agency-users/'}${agencyId}`,agencyId,{observe: 'response'})
  }

  public leadAssignment(data : any){
    return this.httpClient.post(`${environment.apiUrl}${'leads_assignment'}`,data,{observe: 'response'})
  }

  public updateLeadAssignment(data : any,leadId: any){
    return this.httpClient.put(`${environment.apiUrl}${'update-leads-assignment/'}${leadId}`,{assigned_to:data},{observe: 'response'})
  }

  public createActivities(data: any){
    return this.httpClient.post(`${environment.apiUrl}${'activities'}`,data,{observe: 'response'});
  }

  public getActivitiesByLeadId(leadId: any){
    return this.httpClient.get(`${environment.apiUrl}${'activities-all/'}${leadId}`,{observe: 'response'});
  }

  public deleteActivities(id: any){
    return this.httpClient.delete(`${environment.apiUrl}${'activities-delete/'}${id}`,{observe: 'response'});
  }

  public getAllIndustries(){
    return this.httpClient.get(`${environment.apiUrl}${'industry-all'}`,{observe: 'response'});
  }

  public getCompanyByLeadId(leadId: any){
    return this.httpClient.get(`${environment.apiUrl}${'leadcompany-detail/'}${leadId}`,{observe: 'response'});
  }

  public getStatusById(id: any){
    return this.httpClient.get(`${environment.apiUrl}${'status/'}${id}`,{observe: 'response'});
  }

  public getIndustryById(id: any){
    return this.httpClient.get(`${environment.apiUrl}${'industry/'}${id}`,{observe: 'response'});
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
