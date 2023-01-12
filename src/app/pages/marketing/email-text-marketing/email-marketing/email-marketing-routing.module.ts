import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { EmailMarketingComponent } from './email-marketing.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path:'email-marketing-list',
      component: EmailMarketingComponent,
      data: { title: marker('Email Marketing') },
    }
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EmailMarketingRoutingModule {}
