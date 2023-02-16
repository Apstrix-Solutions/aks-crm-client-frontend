import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ShellModule } from "@app/shell/shell.module";
import { ListWorkflowComponent } from "./list-workflow.component";
import { ListWorkflowRoutingModule } from "./list-workflow-routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ShellModule,
    ListWorkflowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [ListWorkflowComponent],
})
export class ListWorkflowModule {}