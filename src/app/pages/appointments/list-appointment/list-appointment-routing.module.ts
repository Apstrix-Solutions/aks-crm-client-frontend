import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ListAppointmentComponent } from './list-appointment.component';


const routes: Routes = [
    Shell.childRoutes([
      {
        path: 'list-appointments',
        component: ListAppointmentComponent,
        data: { title: marker(' List Appointments') },
      },
      {
        path: 'list-appointments/:id',
        component: ListAppointmentComponent,
        data: { title: marker(' List Appointments') },
      },
    ]),
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
  })
  export class ListAppointmentRoutingModule {}