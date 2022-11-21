import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  newAddContactForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  ContactListById: any = [];
  leadId: any = [];

  constructor(
    private contactService: ContactService,
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.newAddContactForm = this.formBulider.group({
      id: [null,[Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      lead_id: [null, [Validators.required]],
    });
    this.getAllContact();
  }

  get f() {
    return this.newAddContactForm.controls;
  }

  addContact(){

  }

  updateContact(){
    this.contactService.getContactById('24').subscribe((data) => {
      this.ContactListById = data['data']['contact'];
    })
  }

  getAllContact() {
    this.contactService.getContact().subscribe((data) => {
      data['data']['contact'].forEach(element => {
        this.leadId.push(element.lead_id);
      });
    });
  }

  onSubmit(){
    if (this.newAddContactForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addContact();
    } else {
      this.updateContact();
    }
  }

}
