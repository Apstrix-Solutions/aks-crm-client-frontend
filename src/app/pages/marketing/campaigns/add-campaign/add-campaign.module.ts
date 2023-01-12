import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddCampaignRoutingModule } from './add-campaign-routing.module';
import { AddCampaignComponent } from './add-campaign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, TranslateModule, AddCampaignRoutingModule,NgSelectModule, ShellModule,FormsModule,ReactiveFormsModule],
  declarations: [AddCampaignComponent],
})
export class AddCampaignModule {}
