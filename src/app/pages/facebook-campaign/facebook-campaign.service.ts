import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FacebookCampaignService {

  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService
    ) {}
  

  public addCampaign(data: any) {
    return this.httpClient
      .post(`${environment.smiApiUrl}${'campaign'}`, JSON.stringify(data))
      .pipe(retry(1), catchError(err => this.errorHandl(err, this.toastr)));
  } 

  public getCampaignObjectives() {
    return this.httpClient.get(`${environment.smiApiUrl}${'objectives'}`,{observe: 'response'});
  }

  public getCampaign() {
    return this.httpClient.get(`${environment.smiApiUrl}${'all-campaigns'}`,{observe: 'response'});
  }

  

  // Error handling
  errorHandl(error, toastr) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    toastr.error('Invalid request. Please try again!', 'Error!');

    return throwError(() => {
      return errorMessage;
    });
  }
  
}