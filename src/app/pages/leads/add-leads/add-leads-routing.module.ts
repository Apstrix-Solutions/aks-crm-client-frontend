import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { AddLeadsComponent } from './add-leads.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'add-lead',
      component: AddLeadsComponent,
      data: { title: marker(' Add Lead') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddLeadsRoutingModule {}
