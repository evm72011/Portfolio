import { Component } from '@angular/core';
import { ApplicationService, ModalForm } from "../app.common/application.service";
import { SessionService } from "../app.session/session.service";
import { QualificationRepository } from "./qualification.repository.service";

import { MobileAlertDeviceQualification } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification.model";
import { MobileAlertDeviceQualificationSet } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification-set.model";

/**
 * Component for synchronizing qualifications
 */
@Component({
    selector: 'app-add-qualification',
    templateUrl: './add-qualification.component.html',
    styleUrls: [
        '../app.common/css/fade-animation.css', 
        '../app.common/css/dialog.css', 
        '../app.common/css/input-dialog.css', 
        './add-qualification.component.css']
  })
export class AddQualificationComponent {

    private qualificationOldName: string;

    public Caption: string = "Erstellung";
    public Qualification: MobileAlertDeviceQualification = new MobileAlertDeviceQualification();

    constructor(
        public session: SessionService,
        public application: ApplicationService,
        private repository: QualificationRepository) 
    {
        this.repository.ValidationResult.fieldRemarks = [];
        if (this.application.Modal == ModalForm.QualificationEdit)
        {
            this.Caption = "Bearbeitung";
            let qualification = <MobileAlertDeviceQualification>this.application.CommonObject;
            Object.assign(this.Qualification, qualification);
            this.qualificationOldName = this.Qualification.name;
        }
    }

    /**
     * Close the modal form, sends changed data to backend for saving (if needed).
     * @param result - OK or Cancel pressed
     */    
    public CloseForm(result: boolean)
    {
        if (result)
        {
            let data = new MobileAlertDeviceQualificationSet();
            this.repository.Data.forEach(
                x => 
                {
                    if ((this.application.Modal != ModalForm.QualificationEdit) ||
                        (this.qualificationOldName != x.name))
                    data.qualifications.push(x);
                }
            );
            data.qualifications.push(this.Qualification)
            this.repository.SendToServer<MobileAlertDeviceQualificationSet>("api/qualification/synchronize", data);
        }
        this.application.CloseModalForm();
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
}