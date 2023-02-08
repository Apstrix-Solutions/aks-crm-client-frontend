import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ShellModule } from "@app/shell/shell.module";
import { AddWorkflowComponent } from "./add-workflow.component";
import { AddWorkflowRoutingModule } from "./add-workflow-ruting";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ShellModule,
    AddWorkflowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AddWorkflowComponent],
})
export class AddWorkflowModule {}