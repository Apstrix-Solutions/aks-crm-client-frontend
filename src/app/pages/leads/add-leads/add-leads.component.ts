import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.scss'],
})
export class AddLeadsComponent implements OnInit {
  newAddLeadForm!: FormGroup;

  constructor(
    private formBulider: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newAddLeadForm = this.formBulider.group({
      title: [null, []],
      firstName: [null, []],
      middleName: [null, []],
      lastName: [null, []],
      primaryNumber: [null, []],
      secondaryNumber: [null, []],
      whatsappNumber: [null, []],
    });
  }
}
