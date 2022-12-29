import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddAppointmentComponent } from './add-appointment.component';
import { AddAppointmentRoutingModule } from './add-appointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AddAppointmentRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AddAppointmentComponent],
})
export class AddAppointmentModule {}