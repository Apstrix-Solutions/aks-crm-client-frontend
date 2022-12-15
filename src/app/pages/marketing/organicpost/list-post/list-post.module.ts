import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ListPostRoutingModule, ShellModule],
  declarations: [ListPostComponent],
})
export class  ListPostModule {}
