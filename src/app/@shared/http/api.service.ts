import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthService } from '@app/auth.service';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private _getHeadersConfig(isPostX = false) {
    // const config = { Authorization: `${this.authService.getAuthToken()}` };
    const config  = {'Authorisation': `${this.authService.getAuthToken()}`};
    if (!isPostX) {
      config['Accept'] = 'application/json';
      config['Content-Type'] = 'application/json';
    }
    return config;
  }

  private _showLoader() {
    //document.getElementById('nb-global-spinner').style.display = 'block';
  }

  public showLoader() {
    this._showLoader();
  }

  public hideLoader() {
    //document.getElementById('nb-global-spinner').style.display = 'none';
  }

  getUrlParams(params: any) {
    let paramText = '?';
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        paramText += `${key}=${encodeURIComponent(params[key])}&`;
      }
    }
    return paramText;
  }
  get(path: string, params: URLSearchParams = new URLSearchParams()) {
    if (!params['hideLoader']) {
      this._showLoader();
    }
    return this.http
      .request('get', `${environment.apiUrl}${path}${this.getUrlParams(params)}`, {
        headers: new HttpHeaders(this._getHeadersConfig()),
      })
      .pipe(
        map(
          (res: any) => res,
          (err: { json: () => any }) => err.json()
        )
      );
  }

  put(path: string, body: Object = {}) {
    if (!body['hideLoader']) {
      this._showLoader();
    }
    return this.http
      .put(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: new HttpHeaders(this._getHeadersConfig()),
      })
      .pipe(
        map(
          (res: any) => res,
          (err: { json: () => any }) => err.json()
        )
      );
  }
  post(path: string, body: Object = {}): Observable<any> {
    this._showLoader();
    return this.http
        .post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: new HttpHeaders(this._getHeadersConfig()),
      })
      .pipe(
        map(
          (res: any) => res,
          (err: { json: () => any }) => err.json()
        )
      );
  }

  postX(path: string, requestParams: Object = {}): Observable<any> {
    this._showLoader();
    const fd = new FormData();
    for (const key in requestParams) {
      if (requestParams[key]) {
        if (requestParams[key].constructor === Array) {
          for (const innerKey in requestParams[key]) {
            if (requestParams[key][innerKey]) {
              fd.append(key, requestParams[key][innerKey]);
            }
          }
        } else {
          fd.append(key, requestParams[key]);
        }
      } else {
        fd.append(key, requestParams[key]);
      }
    }
    return this.http
      .post(`${environment.apiUrl}${path}`, fd, { headers: new HttpHeaders(this._getHeadersConfig(true)) })
      .pipe(
        map(
          (res: any) => res,
          (err: { json: () => any }) => err.json()
        )
      );
  }

  delete(path: string, body: Object = {}): Observable<any> {
    this._showLoader();
    return this.http
      .request('delete', `${environment.apiUrl}${path}`, {
        body: JSON.stringify(body),
        headers: new HttpHeaders(this._getHeadersConfig()),
      })
      .pipe(
        map(
          (res: any) => res,
          (err: { json: () => any }) => err.json()
        )
      );
  }
}
