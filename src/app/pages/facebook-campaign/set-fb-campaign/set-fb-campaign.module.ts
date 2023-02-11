import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { SetFbCampaignComponent } from './set-fb-campaign.component';
import { SetFbCampaignRoutingModule } from './set-fb-campaign-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SetFbCampaignRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ToastrModule.forRoot(),
  ],
  declarations: [SetFbCampaignComponent],
})
export class SetFbCampaignModule {}