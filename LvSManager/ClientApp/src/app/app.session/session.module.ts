import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { ChangePasswordComponent } from "./change-password.component";
import { SessionLogOnComponent } from "./session-log-on.component";

@NgModule({
    imports:      [ FormsModule ],
    declarations: [
        ChangePasswordComponent,
        SessionLogOnComponent],
    exports: [
        ChangePasswordComponent,
        SessionLogOnComponent] 
})
export class SessionModule { }