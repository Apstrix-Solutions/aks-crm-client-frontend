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
}
