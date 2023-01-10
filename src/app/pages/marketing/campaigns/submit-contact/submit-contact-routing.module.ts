import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { SubmitContactComponent } from './submit-contact.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'submit-contact',
      component: SubmitContactComponent,
      data: { title: marker('Submit Contact') },
    },
    {
      path: 'submit-contact/:id',
      component: SubmitContactComponent,
      data: { title: marker('Submit Contact') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SubmitContactRoutingModule {}