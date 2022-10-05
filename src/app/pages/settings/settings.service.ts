import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    constructor(private httpClient: HttpClient) { }

    public addSettings(data:any){
        return this.httpClient.post(`${environment.apiUrl}${'settings/general/add'}`,
            JSON.stringify(data)
        )
        .pipe(retry(1),catchError(this.errorHandl));
    }

    public updateSettings(data:any, id:any){
        let formParams = new FormData()
        formParams.append('fileupload',JSON.stringify(data.file_uploaded))
        
        return this.httpClient.put(`${environment.apiUrl}${'settings/update'}`,
            JSON.stringify(data)
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    public uploadFile(data:any){
        let formParams = new FormData();
        formParams.set('siteLogo', data)
        return this.httpClient.post(`${environment.apiUrl}${'settings/general/upload_file'}`,
            formParams,
        )
        .pipe(retry(1),catchError(this.errorHandl));
    }

    errorHandl(error){
        let errorMessage = error.error.message;
        if(error.error instanceof ErrorEvent){
            errorMessage = error.error.message;
        }
        else{
            errorMessage = `Error Code:${error.status}\nMessage:${error.message}`
        }
        return throwError( () => {
            return errorMessage;
        });
    }

    public getSettings(){
        return this.httpClient.get(`${environment.apiUrl}${'settings/all'}`);
      }
}