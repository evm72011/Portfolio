import { Component } from '@angular/core';
import { ApplicationService, DialogType, ModalForm } from "../app.common/application.service";
import { LinkRepository } from "./link.repository.service";
import { GroupRepository } from "../app.group/group.repository.service";
import { DeviceRepository } from "../app.device/device.repository.service";

import { MobileAlertDeviceSpreadGroup} from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group.model"
import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";
import { MobileAlertDeviceSpreadGroupLinkToAlertDevice } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group-link-to-alert-device.model";

/**
 * Component for work with links between spread groups and alert devices
 */
@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrls: ['../app.common/css/fade-animation.css', './link.component.css']
  })
export class LinkComponent {

    constructor(
        private application: ApplicationService,
        public groupRepository: GroupRepository,
        public deviceRepository: DeviceRepository,
        public linkRepository: LinkRepository)
    {
        this.ClearFilter();
        this.GetData();
    } 

    /**
     * Refreshes lists of devices, groups and links
     */    
    public GetData()
    {
        this.groupRepository.GetData();
        this.deviceRepository.GetData();
        this.linkRepository.GetData();
    }

    /**
     * Clears the filter and refreshes daata set
     */    
    public ClearFilter()
    {
        this.groupRepository.filter.Clear();
        this.deviceRepository.filter.Clear();
        this.GetData();
    }

    /**
     * Returns Bootstrap class for the set group-device in accordance with existing or not link between them      * @param group 
     * @param device 
     */    
    public mapClassLinkButton(group: MobileAlertDeviceSpreadGroup, device: MobileAlertDeviceQueryEntry): object
    {
        if (this.linkRepository.LinkExist(group, device))
            return {"btn-success": true}
        else
            return {"btn-secondary": true}
    }

    /**
     * Creates or deletes (if already existes) link between a spread group and an alert device
     * @param group 
     * @param device 
     */
    public ChangeLink(group: MobileAlertDeviceSpreadGroup, device: MobileAlertDeviceQueryEntry)
    {
        var url: string;
        if (this.linkRepository.LinkExist(group, device))
            url = "/delete";
        else
            url = "/write";
        let link = new MobileAlertDeviceSpreadGroupLinkToAlertDevice();
        link.spreadGroupIdentity = group.identity;
        link.alertDeviceIdentity = device.identity.deviceId;
        this.linkRepository.SendToServer<MobileAlertDeviceSpreadGroupLinkToAlertDevice>("api/link" + url, link);
    }

    /**
     * Creates links between the group and all devices
     * @param group 
     */
    public SelectAll(group: MobileAlertDeviceSpreadGroup)
    {
        this.application.ShowDialog(DialogType.Warning, 
            "Möchten Sie tatsächlich für die Alarmgruppe [" + group.name + 
            "] alle ausgewählte Alarmgeräte wählen?", true);
        this.application.DialogResult.subscribe(
            result => {
                if (result)
                {
                    this.deviceRepository.Data.forEach(
                        device =>
                        {
                            if (!this.linkRepository.LinkExist(group, device))
                            {
                                let link = new MobileAlertDeviceSpreadGroupLinkToAlertDevice();
                                link.spreadGroupIdentity = group.identity;
                                link.alertDeviceIdentity = device.identity.deviceId;
                                this.linkRepository.SendToServer<MobileAlertDeviceSpreadGroupLinkToAlertDevice>("api/link/write", link);                
                            }
                        }
                    );
                }
            }
        );
    }

    /**
     * Deletes all links between the group and all devices
     * @param group 
     */
    public SelectNone(group: MobileAlertDeviceSpreadGroup)
    {
        this.application.ShowDialog(DialogType.Warning, 
            "Möchten Sie tatsächlich für die Alarmgruppe [" + group.name + 
            "] alle ausgewählte Alarmgeräte unwählen?", true);
        this.application.DialogResult.subscribe(
            result => {
                if (result)
                {
                    this.deviceRepository.Data.forEach(
                        device =>
                        {
                            if (this.linkRepository.LinkExist(group, device))
                            {
                                let link = new MobileAlertDeviceSpreadGroupLinkToAlertDevice();
                                link.spreadGroupIdentity = group.identity;
                                link.alertDeviceIdentity = device.identity.deviceId;
                                this.linkRepository.SendToServer<MobileAlertDeviceSpreadGroupLinkToAlertDevice>("api/link/delete", link);                
                            }
                        }
                    );
                }
            }
        )
    }

    /**
     * Shows the form for editing an existing alert device
     */    
    public EditDevice(device: MobileAlertDeviceQueryEntry)
    {
        this.application.CommonObject = device;
        this.application.ShowModalForm(ModalForm.DeviceEdit);
        this.application.ModalResult.subscribe(
            result => {
            }
        );
    }

    /**
     * Shows the form for editing an existing spread group
     */    
    public EditGroup(group: MobileAlertDeviceSpreadGroup)
    {
        this.application.CommonObject = group;
        this.application.ShowModalForm(ModalForm.GroupEdit);
        this.application.ModalResult.subscribe(
            result => {
            }
        );
    }
}