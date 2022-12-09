import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ImportLeadsComponent } from './import-leads.component';

const routes: Routes = [
    Shell.childRoutes([
        {
            path: 'import-lead',
            component: ImportLeadsComponent,
            data: { title: marker('Import-Lead') },
        },
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})

export class ImportLeadsRoutingModule {}