import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ListGoogleAdsComponent } from './list-google-ads.component'


const routes: Routes = [
    Shell.childRoutes([
      {
        path: 'list-google-ads',
        component: ListGoogleAdsComponent,
        data: { title: marker(' List Google Ads') },
      }
     
    ]),
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
  })
  export class ListGoogleAdsRoutingModule {}