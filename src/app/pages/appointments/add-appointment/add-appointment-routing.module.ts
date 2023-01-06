import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AddAppointmentComponent } from './add-appointment.component';


const routes: Routes = [
    Shell.childRoutes([
      {
        path: 'add-appointments',
        component: AddAppointmentComponent,
        data: { title: marker(' Add Appointments') },
      },
      {
        path: 'add-appointments/:id',
        component: AddAppointmentComponent,
        data: { title: marker(' Edit Appointments') },
      },
    ]),
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
  })
  export class AddAppointmentRoutingModule {}