import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitContactComponent } from './submit-contact.component';
import { SubmitContactRoutingModule } from './submit-contact-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SubmitContactRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [SubmitContactComponent],
})
export class SubmitContactModule {}
