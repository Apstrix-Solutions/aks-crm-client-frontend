import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AdsKeywordsComponent } from './ads-keywords.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'ads-keywords',
      component: AdsKeywordsComponent,
      data: { title: marker(' Add Google Ads') },
    },
   
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdsKeywordsRoutingModule {}