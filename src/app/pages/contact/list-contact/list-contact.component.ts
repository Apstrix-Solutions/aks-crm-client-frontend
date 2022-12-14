import { Component, OnInit, NgZone } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
})
export class ListContactComponent implements OnInit {
  contactList: any = [];
  id: string;
  setBackToLeadUrl: any;

  constructor(
    private contactService: ContactService,
    public toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getContactById();
  }

  goBackToLead() {
    this.ngZone.run(() => this.router.navigateByUrl(`view-lead/${this.id}`));
  }

  editContact(contact_id: string, lead_id: string) {
    this.ngZone.run(() =>
      this.router.navigateByUrl(`add-contacts/${lead_id}/${contact_id}`)
    );
  }

  open(content, contactId) {
    if (confirm('Are you sure to delete ?')) {
      this.contactService.deleteContact(contactId).subscribe((res) => {
        this.getContactById();

        if (res['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

  getContactById() {
    this.contactService.getContactById(this.id).subscribe((data) => {

      if (data['data']['contact'] == null && !this.id) {
        this.ngZone.run(() => this.router.navigateByUrl(`leads`));
        this.toastr.error('No contacts found', 'Error!');
      } else if (data['data']['contact'] == null) {
        this.contactList = [];
      } else {
        this.contactList = data['data']['contact']
      }

    });
  }
}
