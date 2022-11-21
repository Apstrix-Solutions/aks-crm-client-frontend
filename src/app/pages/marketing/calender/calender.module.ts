import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShellModule } from '@app/shell/shell.module';
import {  CalenderRoutingModule } from './calender-routing.module';
import {  CalenderComponent } from './calender.component';

@NgModule({
  imports: [CommonModule, TranslateModule,  CalenderRoutingModule, ShellModule],
  declarations: [CalenderComponent],
})
export class CalenderModule {}
