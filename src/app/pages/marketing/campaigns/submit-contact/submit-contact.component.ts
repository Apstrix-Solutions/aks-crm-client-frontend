import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-contact',
  templateUrl: './submit-contact.component.html',
  styleUrls: ['./submit-contact.component.scss']
})
export class SubmitContactComponent implements OnInit {
  newContactForm!: FormGroup;
  isAddMode: boolean;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.newContactForm = this.formBuilder.group({
      title: [null, Validators.required],
      url: [
        null,
        [
          Validators.required,
          Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
        ]
      ],
    })
  }

  addContact() { }

  editContact() { }

  cleadForm() {
    this.newContactForm.patchValue({
      title: "",
      url: ""
    });
  }

  onSubmit() {
    if (this.newContactForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addContact();
    } else {
      this.editContact();
    }

  };

  get f() {
    return this.newContactForm.controls;
  };

}
