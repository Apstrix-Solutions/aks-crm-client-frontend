import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AddContactComponent } from './add-contact.component'

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'add-contacts',
      component: AddContactComponent,
      data: { title: marker(' Add Contact') },
    },
    {
      path: 'add-contacts/:lead_id',
      component: AddContactComponent,
      data: { title: marker(' Add Contact') },
    },
    {
      path: 'add-contacts/:lead_id/:contact_id',
      component: AddContactComponent,
      data: { title: marker(' Edit Contact') },
    },
   
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddContactRoutingModule {}