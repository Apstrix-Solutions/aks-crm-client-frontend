import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  getContact(){
    return this.httpClient.get(`${environment.apiUrl}${'contacts_all'}`);
  }

  getContactById(id:string) {
    return this.httpClient.get(`${environment.apiUrl}${'contacts/'}${id}`);
  }
}
