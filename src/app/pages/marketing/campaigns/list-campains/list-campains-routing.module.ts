import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import {ListCampainsComponent } from './list-campains.component';
import { Shell } from '@app/shell/shell.service';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'list-campaign',
      component: ListCampainsComponent,
      data: { title: marker('List campaign') },
    },
    {
      path: 'list-campaign/:id',
      component: ListCampainsComponent,
      data: { title: marker('List campaign') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListCampainsRoutingModule {}
