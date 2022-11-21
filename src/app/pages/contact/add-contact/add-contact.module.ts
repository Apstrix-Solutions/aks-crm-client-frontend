import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddContactRoutingModule } from './add-contact-routing';
import { AddContactComponent } from './add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AddContactRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AddContactComponent],
})
export class AddContactModule {}