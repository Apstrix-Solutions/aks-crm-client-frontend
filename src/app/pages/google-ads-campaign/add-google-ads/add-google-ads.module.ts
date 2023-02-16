import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddGoogleAdsComponent } from './add-google-ads.component';
import { AddGoogleAdsRoutingModule } from './add-google-ads-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';


@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    AddGoogleAdsRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AddGoogleAdsComponent],
})
export class AddGoogleAdsModule {}