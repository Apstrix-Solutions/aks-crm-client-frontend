import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private httpClient: HttpClient) { }
  
  public ownedPage() {
    return this.httpClient.get(`${environment.smiApiUrl}${'owned-pages'}`,{observe: 'response'});
  }
  public clientPage() {
    return this.httpClient.get(`${environment.smiApiUrl}${'client-pages'}`,{observe: 'response'});
  }
  public instaPage() {
    return this.httpClient.get(`${environment.smiApiUrl}${'insta-adaccounts'}`,{observe: 'response'});
  }
  public addContent(data) {
    console.log(data);
    debugger;
    return this.httpClient
      .post(`${environment.smiApiUrl}${'activity'}`, JSON.stringify(data))
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public addedFiles(data:any){
    let formParams = new FormData();
    formParams.set('photo_attachment', data)
    return this.httpClient.post(`${environment.smiApiUrl}${'upload-photo'}`,
        formParams,
        {observe: 'response'}
    )
    .pipe(retry(1),catchError(this.errorHandl));
    //return this.httpClient.get(`${environment.smiApiUrl}${'upload-photo'}`,{observe: 'response'});
  }
  getPost(){
    return this.httpClient.get(`${environment.smiApiUrl}${'posts'}`);
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
