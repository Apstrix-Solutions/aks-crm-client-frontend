import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CampaignsRoutingModule, ShellModule],
  declarations: [CampaignsComponent],
})
export class CampaignsModule {}
