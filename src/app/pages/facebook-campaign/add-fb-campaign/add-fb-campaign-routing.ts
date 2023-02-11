import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AddFbCampaignComponent } from './add-fb-campaign.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'add-fb-campaign',
      component: AddFbCampaignComponent,
      data: { title: marker(' Add Facebook Campaign') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddFbCampaignRoutingModule {}