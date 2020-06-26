import { Component } from "@angular/core";

import { ApplicationService } from "../app.common/application.service";
import { SessionService } from "./session.service";

/**
 * Component for users's loogging on the cloud
 */
@Component({
    selector: 'app-session-log-on',
    templateUrl: "session-log-on.component.html",
    styleUrls: ["../app.common/css/fade-animation.css",'../app.common/css/dialog.css', "./password-dialog.css"]
    })
export class SessionLogOnComponent {

    constructor(
        public session: SessionService,
        public application: ApplicationService) 
    {
        this.session.cloudLogOnData.clientIdentity = localStorage.getItem("clientIdentity"); 
        this.session.cloudLogOnData.userLogOnName = localStorage.getItem("userLogOnName");
        this.session.cloudLogOnData.userPassword = "";
    }

    /**
     * Close the modal form, sends changed data to backend for saving (if needed).
     * @param result - OK or Cancel pressed
     */  
    public CloseForm(result: boolean)
    {
        if (result)
            this.session.SessionLogOn();
        else
            this.application.CloseModalForm();
    }

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