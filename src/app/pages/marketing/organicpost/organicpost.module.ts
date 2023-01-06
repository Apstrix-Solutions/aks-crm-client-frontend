import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { OrganicpostRoutingModule } from './organicpost-routing.module';
import { OrganicpostComponent } from './organicpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  imports: [CommonModule, TranslateModule,  OrganicpostRoutingModule, ShellModule,FormsModule,
    ReactiveFormsModule,NgxDropzoneModule,],
  declarations: [ OrganicpostComponent],
})
export class OrganicpostModule {}
