import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ImportLeadsRoutingModule } from './import-leads-routing.module';
import { ImportLeadsComponent } from './import-leads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
    imports:[
        CommonModule,
        TranslateModule,
        ImportLeadsRoutingModule,
        ShellModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgxDropzoneModule
    ],
    declarations: [ImportLeadsComponent],
})
export class ImportLeadsModule {}