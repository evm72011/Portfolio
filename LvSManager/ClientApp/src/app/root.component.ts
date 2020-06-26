import { Component } from '@angular/core';
import { ApplicationService, ModalForm, AppMode } from "./app.common/application.service";
import { SessionService } from "./app.session/session.service";


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./app.common/css/fade-animation.css', './root.component.css']
})
export class RootComponent {
    constructor(
        public session: SessionService,
        public application: ApplicationService) { }
    
    public SetMode(mode: string)
    {
        if (this.application.MustLogOn)
        {
            this.application.ShowModalForm(ModalForm.Logon);
            return;
        }
        this.application.SetMode(AppMode[mode]);
    }

    public ShowModal = (mode: string) => this.application.ShowModalForm(ModalForm[mode]);
        
    public SessionLogOff = () => this.session.SessionLogOff();

    public Add = () => this.application.ActiveComponent.Add();

    public Delete = () => this.application.ActiveComponent.Delete();

    public Edit = () => this.application.ActiveComponent.Edit();

    public mapClassAddButtonVisible(): object
    {
        console.log()
        return {"invisible":
            this.application.Mode != AppMode.Device &&
            this.application.Mode != AppMode.Group &&
            this.application.Mode != AppMode.Qualification}
    }

    public mapModeFont(mode: string): Object
    {
        return {"bold-font": mode === this.application.ModeStr()}
    }

    public mapClassDisabled(): Object
    {
        return {"disabled": this.application.Modal != ModalForm.None}
    }

    public mapStyleProgressLimit(): Object
    {
        let percent = 100 * this.application.DeviceCountTotal / this.application.DeviceCountLimit;
        return {width: percent + "%"}
    }
}

