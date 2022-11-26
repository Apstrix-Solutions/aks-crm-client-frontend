import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss'],
})
export class ViewLeadsComponent implements OnInit {
  id: string;
  ImageProp = '../../../../assets/img/user.svg';
  leadDetails: any = [];
  leadSocialDetails: any = [];
  leadAddressDetails: any = [];
  leadId: string;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private leadService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.leadId = this.id;

    this.getLeadById();
    this.getLeadAddressById();
    this.getLeadSocialById();
  }

  addContact() {
    this.ngZone.run(() =>
      this.router.navigateByUrl(`add-contacts/${this.leadId}`)
    );
  }
  getLeadById() {
    this.leadService.getLeadById(this.leadId).subscribe((res) => {
      this.leadDetails = res['data']['users'];
      console.log('get lead by id', this.leadDetails);
    });
  }

  getLeadSocialById() {
    this.leadService.getLeadSocialsByLeadId(this.leadId).subscribe((res) => {
      this.leadSocialDetails = res['data']['social'];
    });
  }

  getLeadAddressById() {
    this.leadService.getLeadAddressByLeadId(this.leadId).subscribe((res) => {
      this.leadAddressDetails = res['data']['address'];
    });
  }
}
