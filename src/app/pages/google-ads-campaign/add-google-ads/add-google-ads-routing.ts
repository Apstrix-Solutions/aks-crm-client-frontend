import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AddGoogleAdsComponent } from './add-google-ads.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'add-google-ads',
      component: AddGoogleAdsComponent,
      data: { title: marker(' Add Google Ads') },
    },
   
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddGoogleAdsRoutingModule {}