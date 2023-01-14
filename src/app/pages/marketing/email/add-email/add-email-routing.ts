import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AddEmailComponent } from './add-email.component'
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'email-marketing',
      component: AddEmailComponent,
      data: { title: marker(' Add Email') },
    },
    {
        path: 'email-marketing/:id',
        component: AddEmailComponent,
        data: { title: marker(' Add Email') },
      },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddEmailRoutingModule {}