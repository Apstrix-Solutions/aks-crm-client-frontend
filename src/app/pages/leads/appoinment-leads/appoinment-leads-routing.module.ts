import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";
import { Shell } from "@app/shell/shell.service";
import { AppoinmentLeadsComponent } from "./appoinment-leads.component";

const routes:Routes = [
    Shell.childRoutes([
        {
            path:'appoinments',
            component:AppoinmentLeadsComponent,
            data: {title:marker('Appoinments')}
        },
        {
            path:'appoinments/:id',
            component:AppoinmentLeadsComponent,
            data: { title:marker('Appoinments')}
        }
    ]),
]

@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class AppoinmentLeadsRoutingModule {}