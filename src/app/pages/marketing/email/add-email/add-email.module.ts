import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddEmailComponent } from './add-email.component';
import { AddEmailRoutingModule } from './add-email-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';


@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    AddEmailRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AddEmailComponent],
})
export class AddEmailModule {}