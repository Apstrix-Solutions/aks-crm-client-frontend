import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import {AddTextComponent } from './add-text.component'
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'text-marketing',
      component: AddTextComponent,
      data: { title: marker(' Add Text') },
    },
    {
        path: 'text-marketing/:id',
        component: AddTextComponent,
        data: { title: marker(' Add Text') },
      },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddTextRoutingModule {}