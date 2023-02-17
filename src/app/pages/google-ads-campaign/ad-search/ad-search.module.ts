import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AdSearchComponent } from './ad-search.component';
import { AdSearchRoutingModule } from './ad-search-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdsKeywordsModule } from '../ads-keywords/ads-keywords.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AdSearchRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AdsKeywordsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AdSearchComponent],
})
export class AdSearchModule {}