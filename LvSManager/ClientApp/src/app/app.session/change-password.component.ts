import { Component } from "@angular/core";

import { ApplicationService, DialogType } from "../app.common/application.service";
import { SessionService } from "./session.service";

/**
 * Component for changing user's password
 */
@Component({
    selector: 'app-change-password',
    templateUrl: "change-password.component.html",
    styleUrls: ["../app.common/css/fade-animation.css", "../app.common/css/dialog.css", "./password-dialog.css"]
    })
export class ChangePasswordComponent {

    public currentPassword: string = "";
    public newPassword1: string = "";
    public newPassword2: string = "";

    constructor(public session: SessionService,
        public application: ApplicationService) {}

    /**
     * Checks that the information for passord changing is valid  
     */    
    public CheckInput() : boolean
    {
        if (this.currentPassword  == "") return false;
        if (this.newPassword1 == "") return false;
        return (this.newPassword1 === this.newPassword2);
    }

    /**
     * Close the modal form, sends changed data to backend for saving (if needed).
     * @param result - OK or Cancel pressed
     */  
    public CloseForm(result: boolean)
    {
        if (!result)
        {
            this.application.CloseModalForm();
            return;
        }
        if (this.currentPassword != this.session.cloudLogOnData.userPassword)
        {
            this.application.ShowDialog(DialogType.Info, "Die Passwortkontrolle ist fehlgeschladen, da der Benutzer ein anders Passwort besitzt!");
            return;
        }
        this.session.SessionChangeUserPassword(this.newPassword1);    }

    /**
     * Work with events Enter or Esc keys pressed in the form
     * @param event 
     */ 
    public onKeyDown(event: KeyboardEvent)
    {
        if (event.key == "Enter")
            this.CloseForm(true);
        if (event.key == "Escape")
            this.CloseForm(false);
    }
}
