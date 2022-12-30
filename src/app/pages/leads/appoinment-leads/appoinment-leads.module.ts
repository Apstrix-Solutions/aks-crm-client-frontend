import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ShellModule } from "@app/shell/shell.module";
import { AppoinmentLeadsComponent } from "./appoinment-leads.component";
import { AppoinmentLeadsRoutingModule } from "./appoinment-leads-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    imports:[
        CommonModule,
        TranslateModule,
        ShellModule,
        AppoinmentLeadsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
        
    ],
    declarations:[AppoinmentLeadsComponent]
})
export class AppoinmentLeadsModule {}