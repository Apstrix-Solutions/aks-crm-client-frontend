import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { CreateContentsRoutingModule } from './create-contents-routing.module';
import { CreateContentsComponent } from './create-contents.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CreateContentsRoutingModule, ShellModule],
  declarations: [CreateContentsComponent],
})
export class CreateContentsModule {}
