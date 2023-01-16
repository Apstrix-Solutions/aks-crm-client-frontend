import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddCampaignRoutingModule } from './add-campaign-routing.module';
import { AddCampaignComponent } from './add-campaign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  imports: [CommonModule, TranslateModule, AddCampaignRoutingModule, ShellModule,FormsModule,ReactiveFormsModule,EditorModule],
  declarations: [AddCampaignComponent],
})
export class AddCampaignModule {}
