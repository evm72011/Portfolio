import { Component } from '@angular/core';
import { ApplicationService, ModalForm } from "../app.common/application.service";

import { GroupRepository } from "./group.repository.service";
import { MobileAlertDeviceSpreadGroup } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group.model";

/**
 * Component for adding and editing spread groups
 */
@Component({
    selector: 'app-add-group',
    templateUrl: './add-group.component.html',
    styleUrls: [
        '../app.common/css/fade-animation.css', 
        '../app.common/css/dialog.css', 
        '../app.common/css/input-dialog.css', 
        './add-group.component.css']
  })
export class AddGroupComponent {

    private inputStarted: boolean = false;

    public Caption: string = "Erstellung";
    public Group: MobileAlertDeviceSpreadGroup = new MobileAlertDeviceSpreadGroup();
    public InputErrorMsg: string = "";
    
    constructor(
        private application: ApplicationService,
        public repository: GroupRepository) 
    {
        this.repository.ValidationResult.fieldRemarks = [];
        if (this.application.Modal == ModalForm.GroupEdit)
        {
            this.Caption = "Bearbeitung";
            let group = <MobileAlertDeviceSpreadGroup>this.application.CommonObject;
            Object.assign(this.Group, group);
        }
    } 

    /**
     * Close the modal form, sends changed data to backend for saving (if needed).
     * @param result - OK or Cancel pressed
     */
    public CloseForm(result: boolean)
    {
        this.application.CloseModalForm();
        if (result) 
            this.repository.SendToServer<MobileAlertDeviceSpreadGroup>("api/group/write", this.Group);
        this.application.ModalResult.next(result);
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

    /**
     * Send object to backend for validation
     */
    public ValidateForm()
    {
        this.inputStarted = true;
        this.repository.Valid<MobileAlertDeviceSpreadGroup>("/api/group", this.Group);
    }

    /**
     * Enabed or disabled OK button is (there are crytical errors after validation).
     */
    public DisabledOkButton(): boolean
    {
        return (this.repository.ValidationResult.fieldRemarks.filter(x => x.violation == 3).length != 0) || (!this.inputStarted);
    }
}