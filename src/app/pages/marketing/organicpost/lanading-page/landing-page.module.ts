import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LanadingPageComponent } from './lanading-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  imports: [CommonModule, TranslateModule, LandingPageRoutingModule, ShellModule,FormsModule,
    ReactiveFormsModule,NgxDropzoneModule,],
  declarations: [LanadingPageComponent],
})
export class LandingModule {}
