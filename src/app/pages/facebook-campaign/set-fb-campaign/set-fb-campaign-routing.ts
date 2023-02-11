import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { SetFbCampaignComponent } from './set-fb-campaign.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'set-fb-campaign',
      component: SetFbCampaignComponent,
      data: { title: marker(' Set Facebook Campaign') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SetFbCampaignRoutingModule {}