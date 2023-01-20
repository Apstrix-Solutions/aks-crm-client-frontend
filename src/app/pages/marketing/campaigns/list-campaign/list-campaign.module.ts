import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListCampaignRoutingModule } from './list-campaign-routing.module';
import { ListCampaignComponent } from './list-campaign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  imports: [CommonModule, TranslateModule, ListCampaignRoutingModule, ShellModule,FormsModule,ReactiveFormsModule,EditorModule],
  declarations: [ListCampaignComponent],
})
export class ListCampaignModule {}
