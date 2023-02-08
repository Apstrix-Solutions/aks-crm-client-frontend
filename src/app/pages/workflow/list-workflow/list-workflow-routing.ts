import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";
import { Shell } from "@app/shell/shell.service";
import { ListWorkflowComponent } from "./list-workflow.component";

const routes: Routes = [
    Shell.childRoutes([
        {
            path: 'list-workflow',
            component: ListWorkflowComponent,
            data: {title: marker('List-Workflow')},
        },
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class ListWorkflowRoutingModule {}