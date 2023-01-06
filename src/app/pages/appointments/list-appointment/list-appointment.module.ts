import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListAppointmentComponent } from './list-appointment.component';
import { ListAppointmentRoutingModule } from './list-appointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ListAppointmentRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [ListAppointmentComponent],
})
export class ListAppointmentModule {}