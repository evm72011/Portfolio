import { Component } from '@angular/core';
import { ApplicationService, ModalForm, DialogType } from "../app.common/application.service";
import { ICommonComponent } from "../models/common.component.interface.model";

import { GroupRepository } from "./group.repository.service";
import { MobileAlertDeviceSpreadGroup} from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group.model"

/**
 * Component for work with spread groups
 */
@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['../app.common/css/fade-animation.css', './group.component.css']
  })
export class GroupComponent implements ICommonComponent{

    private selectedItems: MobileAlertDeviceSpreadGroup[] = [];
    
    constructor(
        private application: ApplicationService,
        public repository: GroupRepository) 
    {
        application.ActiveComponent = this;
        this.repository.GetData();
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    } 

    /**
     * Shows the form for adding a new spread group
     */
    public Add()
    {
        this.application.ShowModalForm(ModalForm.GroupAdd);
    }

    /**
     * Delete a spread group
     */    
    public Delete()
    {
        this.application.ShowDialog(DialogType.Warning, 
            "Möchten Sie tatsächlich die ausgewählten Alarmgruppen [" + 
            this.selectedItems.length + 
            "] persistent löschen?", true);
        this.application.DialogResult.subscribe(
            result => {
                if (result)
                {
                    this.selectedItems.forEach(
                        item =>
                        {                  
                            this.repository.SendToServer<MobileAlertDeviceSpreadGroup>("api/group/delete", item);
                        }
                    );                    
                }
                this.selectedItems = [];
                this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
            }
        );
    }

    /**
     * Shows the form for editing an existing spread group
     */    
    public Edit()
    {
        if (this.selectedItems.length != 1) return;
        this.application.CommonObject = this.selectedItems[0];
        this.application.ShowModalForm(ModalForm.GroupEdit);
        this.application.ModalResult.subscribe(
            result => {
                this.selectedItems = [];
                this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
            }
        );
    }

    /**
     * Assigns "selected" html class for selected spread groups for further css styling
     * @param device 
     */
    public mapClassSelected(group: MobileAlertDeviceSpreadGroup): Object
    {
        if (this.selectedItems.filter(x => x.equal(group)).length > 0) 
            return {"selected": true};
        return {};
    }

    /**
     * Mouse click event on a group. Changes the set of selected items
     * @param event 
     * @param device 
     */    
    public onClick(event: MouseEvent, group: MobileAlertDeviceSpreadGroup)
    {
        if (event.ctrlKey)
        {
            if (this.selectedItems.filter(x => x.equal(group)).length > 0)
            {
                this.selectedItems = this.selectedItems.filter(x => !x.equal(group));
            }
            else
            {
                this.selectedItems.push(group);
            }
        }
        else
        {
            this.selectedItems = [group];
        }
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }

    /**
     * Changes the set of selected items
     * @param mode: 0 - select all, 1 - select none, 2 - invert selection 
     */    
    public ChangeSelection(mode: number)
    {
        if (mode == 0)
        {
            this.selectedItems = this.repository.Data;
        }
        else if (mode == 1)
        {
            this.selectedItems = [];
        }
        else
        {
            var tmp = [];
            this.repository.Data.forEach(
                group =>
                {
                    if (this.selectedItems.filter(x => x.equal(group)).length == 0)
                        tmp.push(group);
                }
            );
            this.selectedItems = tmp;
        }
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }

    /**
     * Returns paths to an ico file according to condition number selected groups
     */    
    public getAlertIco(): string
    {
        if (this.selectedItems.length == 0)
            return "../../assets/alert-off.png";
        else
            return "../../assets/alert-on.png";
    } 

    /**
     * Shows modal form for sending alert to selected spread groups
     */
    public SendAlert()
    {
        if (this.selectedItems.length == 0 ) return;
        this.application.CommonObject = this.selectedItems;
        this.application.ShowModalForm(ModalForm.SendAlert);
        this.selectedItems = [];
    }
}