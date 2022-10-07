import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [CommonModule, TranslateModule, UserProfileRoutingModule,ShellModule],
  declarations: [UserProfileComponent],
})
export class UserProfileModule {}
