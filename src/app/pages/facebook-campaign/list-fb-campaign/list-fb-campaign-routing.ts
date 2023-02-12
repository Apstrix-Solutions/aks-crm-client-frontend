import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ListFbCampaignComponent } from './list-fb-campaign.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'list-fb-campaign',
      component: ListFbCampaignComponent,
      data: { title: marker(' List Facebook Campaign') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListFbCampaignRoutingModule {}