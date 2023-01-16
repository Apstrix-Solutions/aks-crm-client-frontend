import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ListCampaignComponent } from './list-campaign.component'; 
import { Shell } from '@app/shell/shell.service';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'list-campaigns',
      component: ListCampaignComponent,
      data: { title: marker('List Campaigns') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListCampaignRoutingModule {}
