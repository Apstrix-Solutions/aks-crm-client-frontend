import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { AccountSettingsComponent } from './account-settings.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'account-settings', component: AccountSettingsComponent, data: { title: marker('Account Settings') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AccountSettingsRoutingModule {}
