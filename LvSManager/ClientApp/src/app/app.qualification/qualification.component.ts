import { Component } from '@angular/core';
import { ApplicationService, ModalForm, DialogType } from "../app.common/application.service";
import { ICommonComponent } from "../models/common.component.interface.model";
import { QualificationRepository } from "./qualification.repository.service";

import { MobileAlertDeviceQualification } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification.model";
import { MobileAlertDeviceQualificationSet } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification-set.model";

/**
 * Component for work with qualifications
 */
@Component({
    selector: 'app-qualification',
    templateUrl: './qualification.component.html',
    styleUrls: ['../app.common/css/fade-animation.css', './qualification.component.css']
  })
export class QualificationComponent implements ICommonComponent{
  
    private selectedItems: MobileAlertDeviceQualification[] = [];
    
    constructor(
        private application: ApplicationService,
        public repository: QualificationRepository) 
    {
        this.repository.GetData();
        this.application.ActiveComponent = this;
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }

    /**
     * Shows the form for adding a new spread group
     */    
    public Add()
    {
        this.application.ShowModalForm(ModalForm.QualificationAdd);
    }

    /**
     * Synchronize the list of qualifications deleting selected items
     */
    public Delete()
    {
        this.application.ShowDialog(DialogType.Warning, 
            "Möchten Sie tatsächlich die ausgewählten Qualifikationen [" + 
            this.selectedItems.length + 
            "] persistent löschen?", true);
        this.application.DialogResult.subscribe(
            result => {
                if (result)
                {
                    let data = new MobileAlertDeviceQualificationSet();
                    this.repository.Data.forEach(
                        q => {
                            if (this.selectedItems.filter(x => x.name == q.name).length == 0)
                                data.qualifications.push(q);
                        }
                    );
                    this.repository.SendToServer<MobileAlertDeviceQualificationSet>("api/qualification/synchronize", data);
                }
                this.selectedItems = [];
                this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
            }
        );
    }

    /**
     * Synchronize the list of qualifications editing selected item
     */    
    public Edit()
    {
        if (this.selectedItems.length != 1) return;
        this.application.CommonObject = this.selectedItems[0];
        this.application.ShowModalForm(ModalForm.QualificationEdit);
        this.application.ModalResult.subscribe(
            result => {
                this.selectedItems = [];
                this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
            }
        );
    }

    /**
     * Assigns "selected" html class for selected items for further css styling
     * @param device 
     */    
    public mapClassSelected(qualification: MobileAlertDeviceQualification): Object
    {
        if (this.selectedItems.filter(x => x.name == qualification.name).length > 0) 
            return {"selected": true};
        return {};
    }

    /**
     * Mouse click event on a qualification. Changes the set of selected items
     * @param event 
     * @param device 
     */        
    public onClick(event: MouseEvent, qualification: MobileAlertDeviceQualification)
    {
        if (event.ctrlKey)
        {
            if (this.selectedItems.filter(x => x.name == qualification.name).length > 0)
            {
                this.selectedItems = this.selectedItems.filter(x => x.name != qualification.name);
            }
            else
            {
                this.selectedItems.push(qualification);
            }
        }
        else
        {
            this.selectedItems = [qualification];
        }
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }
}
