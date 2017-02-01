import { NgModule } from '@angular/core';
import {TlogService} from "../shared/Services/tlog.service";
import {LoginComponent} from "./login.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../shared/Services/login.service";


@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: [
        LoginComponent
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        TlogService,
        LoginService
    ],
})
export class LoginModule { }

