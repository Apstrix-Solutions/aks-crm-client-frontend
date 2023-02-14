import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListGoogleAdsComponent } from './list-google-ads.component';
import { ListGoogleAdsRoutingModule } from './list-google-ads-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    ListGoogleAdsRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [ListGoogleAdsComponent],
})
export class ListGoogleAdsModule {}