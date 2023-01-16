import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { AddTextComponent } from './add-text.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {AddTextRoutingModule} from './add-text.routing';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    TranslateModule,
    AddTextRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AddTextComponent],
})
export class AddTextModule {}