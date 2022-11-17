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
      data: { title: marker(' Add Contacts') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddContactRoutingModule {}