import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListTextComponent} from './list-text.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ListTextRoutingModule} from './list-text.routing'


@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    ListTextRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [ListTextComponent],
})
export class ListTextModule {}