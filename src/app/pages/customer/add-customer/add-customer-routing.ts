import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { AddCustomerComponent } from './add-customer.component'

const routes: Routes = [
    Shell.childRoutes([
        {
            path:'add-customer',
            component:AddCustomerComponent,
            data:{ title: marker('Add-Customer')},
        },
        {
            path:'add-customer/:id',
            component:AddCustomerComponent,
            data:{title: marker('Edit-Customer')}
        },
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
  })
  export class AddCustomerRoutingModule {}