import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getAllCustomer() {
    return this.httpClient.get(`${environment.apiUrl}${'customer_all'}`,{observe: 'response'});
  }

  getCustomerById(customerId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'new-customer/'}${customerId}`,{observe:'response'})
  }

  addCustomer(data: any) {
    return this.httpClient.post(`${environment.apiUrl}${'new-customer-create'}`,data,{observe: 'response'});
  }

  updateCustomer(data: any, id: any){
    return this.httpClient.put(`${environment.apiUrl}${'new-customer-update/'}${id}`,data,{observe: 'response'});
  }

  deleteCustomer(customerId: any){
    return this.httpClient.put(`${environment.apiUrl}${'new-customer-delete'}`,{id: customerId},{observe:'response'});
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
