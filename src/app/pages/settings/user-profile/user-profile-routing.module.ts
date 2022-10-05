import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'user-profile', component: UserProfileComponent, data: { title: marker('User Profile') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserProfileRoutingModule {}
