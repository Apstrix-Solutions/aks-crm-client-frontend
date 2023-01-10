import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ViewPostComponent } from './view-post.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'view-post',
      component: ViewPostComponent,
      data: { title: marker(' View Lead') },
    },
    {
      path: 'view-post/:id',
      component: ViewPostComponent,
      data: { title: marker(' View Lead') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ViewPostRoutingModule {}