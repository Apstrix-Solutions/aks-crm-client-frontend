import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';

@NgModule({
  imports: [CommonModule, TranslateModule, DashbordRoutingModule, ShellModule],
  declarations: [DashbordComponent],
})
export class DashbordModule {}
