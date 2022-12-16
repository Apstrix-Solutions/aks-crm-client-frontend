import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListCampainsRoutingModule } from './list-campains-routing.module';
import { ListCampainsComponent } from './list-campains.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ListCampainsRoutingModule, ShellModule],
  declarations: [ListCampainsComponent],
})
export class  ListCampainsModule {}
