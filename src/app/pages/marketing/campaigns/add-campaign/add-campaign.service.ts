import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AddCampaignService {



  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService
    ) {}
  

  public addCampaign(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${''}`, JSON.stringify(data),{observe: 'response'})
      .pipe(retry(1), catchError(this.errorHandl));
  } 

  public getCampaign() {
    return this.httpClient.get(`${environment.apiUrl}${''}`,{observe: 'response'});
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
