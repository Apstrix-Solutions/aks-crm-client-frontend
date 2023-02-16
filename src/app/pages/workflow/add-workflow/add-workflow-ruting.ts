import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";
import { Shell } from "@app/shell/shell.service";
import { AddWorkflowComponent } from "./add-workflow.component";

const routes: Routes = [
    Shell.childRoutes([
        {
            path: 'add-workflow',
            component: AddWorkflowComponent,
            data: {title: marker('Add-Workflow')},
        },
        {
            path: 'add-workflow/:id',
            component: AddWorkflowComponent,
            data: {title: marker('Edit-Workflow')},
        },
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AddWorkflowRoutingModule {}