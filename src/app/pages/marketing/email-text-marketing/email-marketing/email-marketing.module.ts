import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EmailMarketingRoutingModule } from './email-marketing-routing.module';
import { EmailMarketingComponent } from './email-marketing.component';

@NgModule({
    imports: [
      CommonModule,
      TranslateModule,
      EmailMarketingRoutingModule,
      EmailMarketingComponent,
      ShellModule,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
    ],
    declarations: [EmailMarketingComponent],
  })

  export class EmailMarketingModule{}