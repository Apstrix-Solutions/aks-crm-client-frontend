import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ViewLeadsComponent } from './view-leads.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'view-lead',
      component: ViewLeadsComponent,
      data: { title: marker(' View Lead') },
    },
    {
      path: 'view-lead/:id',
      component: ViewLeadsComponent,
      data: { title: marker(' View Lead') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ViewLeadsRoutingModule {}