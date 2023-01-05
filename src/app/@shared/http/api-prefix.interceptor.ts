import { Router } from '@angular/router';
//import { SweetAlertService } from 'angular-sweetalert-service/js';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    //public sweetAlertService: SweetAlertService,
    private router: Router,
    private authService: AuthService
  ) {}

  private _requestCount = 0;

  private _hideLoader() {
    // setTimeout(function () { document.getElementById('nb-global-spinner').style.display = 'none'; }, 500);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._requestCount++;

    request = request.clone({
      setHeaders: {
        Authorisation: `${this.authService.getAuthToken()}`,
        'x-token': `${this.authService.getAuthToken()}`,
        'content-type': 'application/json',
        'Access-Token-Facebook': this.authService.getFbAuthToken()
      },
    });
    if(request.url.endsWith('upload') ||  request.url.endsWith('upload-photo') ){
      if (request.headers.has('content-type')) {
        request = request.clone({ headers: request.headers.delete('content-type','application/json') });
    }
  }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            if (0 == this._requestCount) {
              this._hideLoader();
            }
            return event.body;
          }
        },
        (err: any) => {
          this._requestCount--;
          if (0 == this._requestCount) {
            this._hideLoader();
          }
          let errorMessage: String;
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 400:
                errorMessage = 'Bad request';
                break;
              case 401:
                errorMessage = err.error.message;
                break;
              case 403:
                errorMessage = err.error.message;
                break;
              case 404:
                errorMessage = 'Not found';
                this.router.navigate(['pages/404']);
                window.location.reload();
                break;
              case 422:
                errorMessage =
                  err.error.errors[Object.keys(err.error.errors)[0]][0];
                break;
              case 423:
                errorMessage = err.error.message;
                break;
              case 429:
                errorMessage = 'Something went wrong, please refresh the page.';
                break;
              case 500:
                errorMessage = err.error.message;
                break;
              case 503:
                errorMessage = 'Service unavailable';
                break;
            }
          }
          if (err.status == 401 && localStorage.getItem('crmLoggedInUser')) {
            localStorage.removeItem('token');
            localStorage.removeItem('crmLoggedInUser');
            localStorage.setItem('errorMsg', err.error.message);
            location.href = environment.apiUrl;
          } else if (404 != err.status) {
            //this.sweetAlertService.error({ title: 'Error', text: errorMessage });
          }
        },
        () => {
          this._requestCount--;
          if (0 == this._requestCount) {
            this._hideLoader();
          }
        }
      )
    );
  }
}
