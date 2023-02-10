import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AdsKeywordsComponent } from './ads-keywords.component';
import { AdsKeywordsRoutingModule } from './ads-keywords-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AdsKeywordsRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AdsKeywordsComponent],
})
export class AdsKeywordsModule {}