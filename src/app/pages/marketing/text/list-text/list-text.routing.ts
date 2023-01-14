import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ListTextComponent} from './list-text.component'
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'list-text',
      component: ListTextComponent,
      data: { title: marker(' List Text') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListTextRoutingModule {}