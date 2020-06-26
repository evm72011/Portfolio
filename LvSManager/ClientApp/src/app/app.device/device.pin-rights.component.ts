import { Component } from '@angular/core';

import { ApplicationService, ModalForm } from "../app.common/application.service";
import { SessionService } from "../app.session/session.service";
import { RequestService } from "../app.common/request.service";
import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";

/**
 * Component for updating device pin and permissions set
 */
@Component({
    selector: 'app-device-pin-rights',
    templateUrl: './device.pin-rights.component.html',
    styleUrls: [
        '../app.common/css/fade-animation.css', 
        '../app.common/css/dialog.css', 
        '../app.common/css/input-dialog.css', 
        './device.pin-rights.component.css']
  })
  export class DevicePinRights{

    public Pin: string = "";
    public Rights: boolean[] = [false, false];

    constructor( 
        public session: SessionService,
        public application: ApplicationService,
        public http: RequestService
        ) 
    { }

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
            let devices = <MobileAlertDeviceQueryEntry[]>this.application.CommonObject;
            devices.forEach(
                device =>
                {
                    this.setPin(device);
                    this.setRights(device);
                }
            );

        }
        this.application.ModalResult.next(result);
    }

    /**
     * Updates pin to an alert device
     * @param device 
     */
    private setPin(device: MobileAlertDeviceQueryEntry)
    {
        let data = {
            session: this.application.Session,
            entity1: device.identity,
            entity2: this.Pin 
        }
        this.http.PostRequest("api/device/pin", data); 
    }

    /**
     * Updates permissions set for an alert device
     * @param device 
     */
    private setRights(device: MobileAlertDeviceQueryEntry)
    {
        let rights = 0;
        if (this.Rights[0]) rights |= (1 << 0);
        if (this.Rights[1]) rights |= (1 << 1);

        let data = {
            session: this.application.Session,
            entity1: device.identity,
            entity2: rights 
        }
        this.http.PostRequest("api/device/rights", data); 

    }
  }