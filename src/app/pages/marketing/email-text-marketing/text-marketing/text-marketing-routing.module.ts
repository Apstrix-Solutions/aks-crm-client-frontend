import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TextMarketingComponent} from './text-marketing.component'

const routes: Routes = [
  Shell.childRoutes([
    {
      path:'text-marketing-list',
      component: TextMarketingComponent,
      data: { title: marker('Text') },
    }
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TextMarketingRoutingModule {}
