import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListEmailComponent } from './list-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {ListEmailRoutingModule} from './list-email.routing'


@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    ListEmailRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [ListEmailComponent],
})
export class ListEmailModule {}