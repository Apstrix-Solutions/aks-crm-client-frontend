import { NgModule } from "@angular/core"; 
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ShellModule } from "@app/shell/shell.module";
import { AddCustomerComponent } from "./add-customer.component";
import { AddCustomerRoutingModule } from "./add-customer-routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
    imports:[
        CommonModule,
        TranslateModule,
        ShellModule,
        AddCustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    declarations:[AddCustomerComponent]
})

export class AddCustomerModule {}