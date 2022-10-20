import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListLeadsRoutingModule } from './list-leads-routing.module';
import { ListLeadsComponent } from './list-leads.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ListLeadsRoutingModule, ShellModule],
  declarations: [ListLeadsComponent],
})
export class ListLeadsModule {}
