import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {

  constructor() { }

  getAuthToken():string {
    const items = { ...localStorage };
    let authToken = localStorage.getItem('credentials');
    if(authToken!=null){
      let tokenDetail = JSON.parse(authToken);

      return tokenDetail.token;
    }
    return '';

  }
  getFbAuthToken():string {
    const items = { ...localStorage };
    let accessToken = localStorage.getItem('fbAccessToken');

    if(accessToken!=null){
    

      return accessToken;
    }
    return '';

  }

  getFbAccountId():string {
    const items = { ...localStorage };
    let fbAccountId = localStorage.getItem('fbAccountId');

    if(fbAccountId!=null){
      return fbAccountId;
    }

    return '';
  }
}
