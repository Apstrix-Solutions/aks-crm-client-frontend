import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ListLeadsComponent } from './list-leads.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'leads',
      component: ListLeadsComponent,
      data: { title: marker(' List Leads') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListLeadsRoutingModule {}
