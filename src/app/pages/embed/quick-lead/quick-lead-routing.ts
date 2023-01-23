import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { QuickLeadComponent } from './quick-lead.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'https://localhost:4200/create-lead',
      component: QuickLeadComponent,
      data: { title: marker(' Create Lead') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class QuickLeadRoutingModule {}