import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  imports: [CommonModule, TranslateModule, LandingPageRoutingModule, ShellModule],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
