import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ListContactComponent } from './list-contact.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'contacts',
      component: ListContactComponent,
      data: { title: marker(' List Contacts') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListContactRoutingModule {}