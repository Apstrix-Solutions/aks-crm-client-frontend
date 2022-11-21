import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent implements OnInit {
  contactList : any = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContact();
  }
  getContact() {
    this.contactService.getContact().subscribe((data) => {
      console.log(data);
      this.contactList = data['data']['contact'];
    });
  }

  getContactById(){
    this.contactService.getContactById('1').subscribe((data) => {
      console.log(data)
    })
  }
}
