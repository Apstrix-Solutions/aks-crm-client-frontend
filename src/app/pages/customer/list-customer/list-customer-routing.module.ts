import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ListCustomerComponent } from './list-customer.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'list-customer',
      component: ListCustomerComponent,
      data: { title: marker(' List Customer') },
    },
    
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListCustomerRoutingModule {}
