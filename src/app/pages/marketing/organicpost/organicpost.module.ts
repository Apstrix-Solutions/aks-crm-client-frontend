import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { OrganicpostRoutingModule } from './organicpost-routing.module';
import { OrganicpostComponent } from './organicpost.component';


@NgModule({
  imports: [CommonModule, TranslateModule,  OrganicpostRoutingModule, ShellModule],
  declarations: [ OrganicpostComponent],
})
export class OrganicpostModule {}
