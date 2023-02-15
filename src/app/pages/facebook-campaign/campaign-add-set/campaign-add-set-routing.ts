import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { CampaignAddSetComponent } from './campaign-add-set.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'campaign-add-set',
      component: CampaignAddSetComponent,
      data: { title: marker('Facebook Campaign Add Set') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CampaignAddSetRoutingModule {}