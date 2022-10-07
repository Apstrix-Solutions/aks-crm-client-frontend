import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ShellModule } from '@app/shell/shell.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule ,ShellModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
