import { Component } from '@angular/core';

import { ApplicationService, ModalForm } from "../app.common/application.service";
import { SessionService } from "../app.session/session.service";
import { RequestService } from "../app.common/request.service";

import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";
import { MobileAlertDeviceEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-entry.model";

/**
 * Component for filling device position for selected elements
 */
@Component({
    selector: 'app-device-fill-position',
    templateUrl: './device.fill-position.component.html',
    styleUrls: [
        '../app.common/css/fade-animation.css', 
        '../app.common/css/dialog.css', 
        '../app.common/css/input-dialog.css', 
        './device.fill-position.component.css']
  })
export class DeviceFillPosition {
    
    private Data: MobileAlertDeviceEntry[] = [];
    public  DataFiltered: MobileAlertDeviceEntry[] = [];
    public SearchText: string = "";
    public SelectedItem: MobileAlertDeviceEntry = null;

    constructor( 
        public session: SessionService,
        public application: ApplicationService,
        public http: RequestService) 
    {
        this.Data = <MobileAlertDeviceEntry[]>application.CommonObject;
        this.ApplyFilter();
    }
    
    /**
     * Form key down event
     * @param event 
     */
    public onKeyDown(event)
    {
        if (event.key == "Escape")
            this.CloseForm(false);
    }

    /**
     * Close the modal form, sends changed data to backend for saving (if needed).
     * @param result - OK or Cancel pressed
     */
    public CloseForm(result: boolean)
    {
        this.application.CloseModalForm();
        if (result)
        {
            this.Data.forEach(
                device =>
                {
                    device.station = this.SelectedItem.station;
                    device.stationPosition = this.SelectedItem.stationPosition;
                    let data =
                    {
                        session: this.application.Session,
                        entity: device
                    }
                    this.http.PostRequest("api/device/write", data);
                }
            );
        }
        this.application.ModalResult.next(result);
    }

    /**
     * Applies filter to the set of devices
     */
    public ApplyFilter()
    {
        if (!this.SearchText)
        {
            this.DataFiltered = this.Data;
            return;
        }
        this.DataFiltered = this.Data.filter(
            device => device.containText(this.SearchText)
        );
        this.SelectedItem = null;
    }

    /**
     * Form click event - selecting a device
     * @param device - device to selection
     */
    public onClick(device: MobileAlertDeviceQueryEntry)
    {
        this.SelectedItem = device;
    }

    /**
     * Assigns "selected" html class for selected devices for further css styling
     * @param device 
     */
    public mapClassSelected(device: MobileAlertDeviceQueryEntry): Object
    {
        return {"selected": this.SelectedItem && this.SelectedItem.equal(device)};
    }
}