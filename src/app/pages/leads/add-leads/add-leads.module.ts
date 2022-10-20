import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddLeadsRoutingModule } from './add-leads-routing.module';
import { AddLeadsComponent } from './add-leads.component';

@NgModule({
  imports: [CommonModule, TranslateModule, AddLeadsRoutingModule, ShellModule],
  declarations: [AddLeadsComponent],
})
export class AddLeadsModule {}
