import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ListEmailComponent } from './list-email.component'
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'list-email',
      component: ListEmailComponent,
      data: { title: marker(' List Email') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListEmailRoutingModule {}