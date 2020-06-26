import { Component } from '@angular/core';

import { ApplicationService, AppMode } from "../app.common/application.service";
import { SessionService } from "../app.session//session.service";
import { RequestService } from "../app.common/request.service";

import { MobileAlertDeviceTelegram } from "../models/ServiceCenterConnectMobileAlertDevicePool/mobile-alert-device-telegram.model";
import { MobileAlertDeviceIdentitySender } from "../models/ServiceCenterConnectMobileAlertDevicePool/mobile-alert-device-identity-sender.model";
import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";
import { CloudColor } from '../models/ServiceCenterConnectMobileAlertDevicePool/cloud-color.model';
import { MobileAlertDeviceSpreadGroup } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group.model";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['../app.common/css/fade-animation.css', "../app.common/css/dialog.css",'./alert.component.css']
  })
export class AlertComponent{

    public Telegram: MobileAlertDeviceTelegram = new MobileAlertDeviceTelegram;
    public Password: string = "";
    public AlertColor: string;

    constructor( 
        public session: SessionService,
        public application: ApplicationService,
        public http: RequestService
        ) 
    { }

    /**
     * Closes modal form for sending alarm.
     * Sends alarm (if OK button was pressed) to the groups or alarms
     * @param result 
     */
    public CloseForm(result: boolean)
    {
        this.application.CloseModalForm();
        if (result)
        {
            this.Telegram.wherePosition.PrepareForSending();
            this.Telegram.alertColor = new CloudColor(this.AlertColor);
            if (this.application.Mode == AppMode.Device)
                this.alertToDevice();
            else
                this.alertToGroup();
        }
        this.application.ModalResult.next(result);
    }

    /**
     * Sends alarm to each selected group 
     */
    private alertToGroup()
    {
        console.log(this.application.CommonObject);
        let groups = <MobileAlertDeviceSpreadGroup[]>this.application.CommonObject;
        groups.forEach(
            group =>
            {
                let data = {
                    session: this.application.Session,
                    entity1: this.session.cloudLogOnData.clientIdentity,
                    entity2: group.name,
                    entity3: this.Telegram 
                }
                this.http.PostRequest("api/alert/group", data); 
            }
        );
    }

    /**
     * Sends alarm to each selected device
     */
    private alertToDevice()
    {
        let devices = <MobileAlertDeviceQueryEntry[]>this.application.CommonObject;
        let senders: MobileAlertDeviceIdentitySender[] = [];

        devices.forEach(
            device => 
            {
                let sender = new MobileAlertDeviceIdentitySender;
                sender.alertAddress = device.identity.alertAddress;
                sender.clientIdentity = device.clientIdentity;
                senders.push(sender);
            }
        );

        let data = {
            session: this.application.Session,
            entity1: senders,
            entity2: this.Telegram 
        }
        this.http.PostRequest("api/alert/device", data); 
    }

    /**
     * Work with events Enter or Esc pressed in the form
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