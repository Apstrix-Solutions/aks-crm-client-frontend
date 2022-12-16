import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  newAddContactForm!: FormGroup;
  id: string;
  isAddMode: boolean;
  ContactList: any = [];
  ContactListById: any = [];
  leadIds: any = [];
  newContactId: string;
  selectedLeadId: string = '';
  selectedContactId: string;
  newContact: boolean;

  constructor(
    private contactService: ContactService,
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['lead_id'];
    // this.isAddMode = !this.id;
    this.selectedLeadId = this.route.snapshot.params['lead_id'];
    this.selectedContactId = this.route.snapshot.params['contact_id'];

    this.newAddContactForm = this.formBulider.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      lead_id: [this.selectedLeadId, [Validators.required]],
      is_active: [1],
    });

    if (!this.selectedContactId) {
      this.getContactById();
      this.newContact = false;
    } else {
      this.getContactByContactId();
      this.newContact = true;
    }
  }

  addContact() {
    this.contactService
      .createContact(this.newAddContactForm.value)
      .subscribe((data) => {
        this.ContactList = data['data']['data'];
        if (data['code'] == 200) {
          this.newContactId = this.ContactList.lead_id;
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/contacts/${this.selectedLeadId}`)
          );
          this.toastr.success(
            data['message'],
            'Successfully created the contact'
          );
        } else {
          this.toastr.error(data['message'], 'Error!');
        }
      });
  }

  updateContact() {
    this.contactService
      .updateContact(this.selectedContactId, this.newAddContactForm.value)
      .subscribe((data) => {
        this.ContactListById = data['data']['contact'];
        if (data['code'] == 200) {
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/contacts/${this.selectedLeadId}`)
          );
          this.toastr.success(
            data['message'],
            'Successfully updated the contact'
          );
        } else {
          this.toastr.error(data['message'], 'Error!');
        }
      });
  }

  getContactById() {
    this.contactService
      .getContactById(this.id)
      .subscribe((data) => {
        this.ContactListById = data['data']['contact'];
      });
  }

  onSubmit() {
    if (this.newAddContactForm.invalid) {
      return;
    }
    if (this.selectedLeadId && !this.selectedContactId) {
      this.addContact();
    } else if (this.selectedContactId) {
      this.updateContact();
    }
  }

  get f() {
    return this.newAddContactForm.controls;
  }

  getContactByContactId() {
    this.contactService
      .getContactByContactId(this.selectedContactId)
      .subscribe((data) => {
        this.ContactListById = data['data']['contact'];
        this.newAddContactForm.patchValue(this.ContactListById);
      });
  }
}
