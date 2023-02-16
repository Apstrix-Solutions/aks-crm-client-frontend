import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListFbCampaignComponent } from './list-fb-campaign.component';
import { ListFbCampaignRoutingModule } from './list-fb-campaign-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ListFbCampaignRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [ListFbCampaignComponent],
})
export class ListFbCampaignModule {}