import { Component } from '@angular/core';
import { ApplicationService, ModalForm, DialogType } from "../app.common/application.service";
import { RequestService } from "../app.common/request.service";
import { ICommonComponent } from "../models/common.component.interface.model";
import { EntityToService } from "../models/entity-to-service.model";
import { MobileAlertDeviceCloudRegistrationData } from "../models/ServiceCenterConnectMobileAlertDevicePool/mobile-alert-device-cloud-registration-data.model";

import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";
import { MobileAlertDeviceIdentity } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-identity.model";
import { DeviceRepository } from "./device.repository.service";
import { MobileAlertDeviceEntry } from '../models/ServiceCenterConnectManagerPool/mobile-alert-device-entry.model';
import { MobileAlertDeviceTelegramWays } from "../models/ServiceCenterConnectManagerPool/enum-mobile-alert-device-telegram-ways";

/**
 * Component to work with list of devices
 */
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['../app.common/css/fade-animation.css', './device.component.css']
})
export class DeviceComponent implements ICommonComponent {

    public selectedItems: MobileAlertDeviceQueryEntry[] = [];
    public viewMode: number = 1; // 0- cards, 1 - list

    public ctrlPressed: boolean;

    constructor(
        private application: ApplicationService,
        private http: RequestService,
        public repository: DeviceRepository) 
    {
        application.ActiveComponent = this;
        this.GetData(); 
    }

    //------------------------------------------    CRUD    ----------------------------------------//
    /**
     * Refreshes list of devices (for example for new filter conditions)
     */
    public GetData()
    {
        this.repository.GetData();
        this.clearSelection();
    }

    /**
     * Shows the form for adding a new alert device
     */
    public Add()
    {
        if (this.application.DeviceCountTotal >= this.application.DeviceCountLimit)
        {
            this.application.ShowDialog(DialogType.Warning, "Ihr Gerätlimit ist übergestiegen!                      ");
            return;
        }
        this.application.ShowModalForm(ModalForm.DeviceAdd);
    }

    /**
     * Delete an alert device
     */
    public Delete()
    {
        this.application.ShowDialog(DialogType.Warning, 
            "Möchten Sie tatsächlich die ausgewählten Alarmgeräte [" + 
            this.selectedItems.length + 
            "] persistent löschen?", true);
        this.application.DialogResult.subscribe(
            result => {
                if (result)
                {
                    this.selectedItems.forEach(
                        item =>
                        {                  
                            this.repository.SendToServer<MobileAlertDeviceEntry>("api/device/delete", item);
                        }
                    );
                }
                this.clearSelection();
            }
        );
    }

    /**
     * Shows the form for editing an existing alert device
     */
    public Edit()
    {
        if (this.selectedItems.length != 1) return;
        this.application.CommonObject = this.selectedItems[0];
        this.application.ShowModalForm(ModalForm.DeviceEdit);
        
        this.application.ModalResult.subscribe(
            result => {
                this.clearSelection();
            }
        );
    }

    //------------------------------------------    View    ----------------------------------------//

    /**
     * Clears the list with selected items
     */
    private clearSelection()
    {
        this.selectedItems = [];
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }

    /**
     * Sets view mode: table or cards
     */
    public SetViewMode = (mode) => this.viewMode = mode;

    /**
     * Returns paths to an ico file according to condition
     * @param ico - filename of the ico (ohne on / off tail and extension)
     * @param condition: true adds "-on" tail, fals adds "-off" tail 
     */
    public getOnOffIco(ico: string, condition: boolean): string
    {
        if (condition)
            return "../../assets/" + ico + "-on.png";
        else
            return "../../assets/" + ico + "-off.png";
    }

    /**
     * Repacks list of alert devices to a 2D array,
     * adds fake devices (with id = -1) to the list if needed
     * Is used for cards device view
     * @param n - number of columns in new 2D array
     * @param items 
     */
    public packDevice(n: number, items: MobileAlertDeviceQueryEntry[]) : MobileAlertDeviceQueryEntry[][]
    {
        var result: MobileAlertDeviceQueryEntry[][] = [];
        let rest = items.length % n;
        if (rest != 0)
        {
            let numberToAdd = n - rest;
            for (let i = 0; i < numberToAdd; i++) {
                let emptyItem = new MobileAlertDeviceQueryEntry();
                emptyItem.identity = new MobileAlertDeviceIdentity();
                emptyItem.hidden  = true;
                items.push(emptyItem);
            }
        }
        for (let i = 0; i < Math.ceil(items.length / n); i++)
        {
            let line: MobileAlertDeviceQueryEntry[] = [];
            for (let j = 0; j < n; j++) {
                line.push(items[i * n + j]);
            }     
            result.push(line);
        }
        return result;
    }

    /**
     * Returns ico file name to show sorting order for table column 
     * @param field - data field assigned with column
     */
    public GetSortingIco(field: string)
    {
        let assets = "../../assets/";
        if (field != this.repository.filter.sorfingField)
            return assets + "empty.png";
        if (this.repository.filter.ascendingSort)
            return assets + "sort-asc.png";
        else
            return assets + "sort-desc.png";
    }

    /**
     * Marks selected telegram way in dropdown telegram way filter with bold font
     * @param way 
     */
    public mapClassFilterTelegramWaySelected(way: number): Object
    {
        return  {boldfont: this.repository.filter.telegramWay == way};
    }

    /**
     * Hides hidden devices
     * @param device 
     */
    public mapStyleVisibleDevice(device: MobileAlertDeviceQueryEntry) : Object
    {
        if (device.hidden)
            return {display: "none"};
        return {};
    }

    /**
     * Returns font color for device in accordance with its telegram way
     * @param device 
     */
    public mapStyleFontDevice(device: MobileAlertDeviceQueryEntry) : Object
    {
        if (device.telegramWay == MobileAlertDeviceTelegramWays.TelegramQueue)
            return {color: "rgb(255,97,7)"};
        else if (device.telegramWay == MobileAlertDeviceTelegramWays.SpeechSynthesis)
            return {color: "rgb(70,163,28)"};
        else if (device.telegramWay == MobileAlertDeviceTelegramWays.ShortMessageService)
            return {color: "rgb(0,123,195)"};
        else 
            return {color: "gray"};
    }

    /**
     * Assigns "selected" html class for selected devices for further css styling
     * @param device 
     */
    public mapClassSelected(device: MobileAlertDeviceQueryEntry): Object
    {
        if (this.selectedItems.filter(x => device.equal(x)).length > 0)
            return {"selected": true};
        return {};
    }

    /**
     * Color for device state mark (at the left bound)
     * @param device 
     */
    public mapClassStateMark(device: MobileAlertDeviceQueryEntry): Object
    {
        if (device.isAuthorizationTokenAssigned) 
            return {"state-mark-green": true};
        else if (!device.isPinAssigned) 
            return {"state-mark-red": true};
        else
            return {"state-mark-gray": true}
    }

    /**
     * Disables or enables html elements in accordance with number selected devices
     * @param n - minimal number of selected devices for enabling
     */
    public mapClassButtonToSelection(n: number)
    {
        return {
            "navbar-button-enabled":  this.selectedItems.length >= n,
            "navbar-button-disabled": this.selectedItems.length < n
        }
    }

    /**
     * Sets new telegram way in the filter abd refreshes data set
     * @param way 
     */
    public SetFilterTelegramWay(way: number)
    {
        this.repository.filter.telegramWay = way;
        this.GetData();
    }

    /**
     * Sets new qualification tag in the filter abd refreshes data set
     * @param way 
     */
    public SetFilterQualification(qualification: string)
    {
        this.repository.filter.qualification = qualification;
        this.GetData();
    }

    /**
     * Changes sorting field and sorting type - asc/desc
     * @param field 
     */
    public ApplySorting(field: string)
    {
        if (this.repository.filter.sorfingField == field)
            this.repository.filter.ascendingSort = !this.repository.filter.ascendingSort;
        else
            this.repository.filter.sorfingField = field;
        this.GetData();
    }

    /**
     * Clears the filter and refreshes daata set
     */
    public ClearFilter()
    {
        this.repository.filter.Clear();
        this.GetData();
    }

    /**
     * Mouse click event on a device. Changes the set of selected items
     * @param event 
     * @param device 
     */
    public onClick(event: MouseEvent, device: MobileAlertDeviceQueryEntry)
    {
        if (event.ctrlKey)
        {
            if (this.selectedItems.filter(x => x.equal(device)).length > 0)
            {
                this.selectedItems = this.selectedItems.filter(x => !x.equal(device));
            }
            else
            {
                this.selectedItems.push(device);
            }
        }
        else
        {
            this.selectedItems = [device];
        }
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }

    /**
     * Mouse double click on the device. Starting device editing.
     * @param device 
     */
    public onDblClick(device: MobileAlertDeviceQueryEntry)
    {
        this.selectedItems = [device];
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
        this.Edit();
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
                device =>
                {
                    if (this.selectedItems.filter(x => x.equal(device)).length == 0)
                        tmp.push(device);
                }
            );
            this.selectedItems = tmp;
        }
        this.application.ChangeAddDelEditButtonsEnablind(this.selectedItems.length);
    }

    /**
     * Shows Change device position modal form
     */
    public FillPositions()
    {
        if (this.selectedItems.length < 2) return;
        this.application.CommonObject = this.selectedItems;
        this.application.ShowModalForm(ModalForm.DeviceFillPosition);
    }

    /**
     * Shows Send alert to device modal form
     */
    public SendAlert()
    {
        if (this.selectedItems.length == 0 ) return;
        this.application.CommonObject = this.selectedItems;
        this.application.ShowModalForm(ModalForm.SendAlert);
        this.clearSelection();
    }

    /**
     * Device registration in the cloud
     */
    public CloudRegistration()
    {
        if (this.selectedItems.length == 0 ) return;
        this.application.ShowDialog(
            DialogType.Warning, 
            "Möchten Sie an die ausgewählten Alarmgeräte die Cloud-Anmeldeinformationen senden?", 
            true);
        this.application.DialogResult.subscribe(
            result => 
            {
                if (result)
                {
                    this.selectedItems.forEach(
                        device =>
                        {
                            let data = new EntityToService<MobileAlertDeviceCloudRegistrationData>();
                            data.entity = new MobileAlertDeviceCloudRegistrationData();
                            data.entity.alertAddress = device.identity.alertAddress;
                            data.entity.serviceBindingHostName = "";
                            this.http.PostRequest("api/alert/cloud", data);
                        }
                    );
                }
                this.clearSelection();
            }
        );
    }

    /**
     * Shows dialog for changing device pin and permissions
     */
    public PinRights()
    {
        if (this.selectedItems.length == 0 ) return;
        this.application.CommonObject = this.selectedItems;
        this.application.ShowModalForm(ModalForm.DevicePinRights);
        this.clearSelection();
    }

    /**
     * Discart alert device registration in the cloud
     */
    public Discard()
    {
        if (this.selectedItems.length == 0 ) return;
        this.application.ShowDialog(
            DialogType.Warning, 
            "Möchten Sie tatsächlich die Registrierungen der ausgewählten Alarmgeräte verwerfen?" + '\n' +
            "Die Alarmgeräte können danach nicht mehr kommunizieren!", 
            true);
        
        this.application.DialogResult.subscribe(
            result => 
            {
                if (result)
                {
                    this.selectedItems.forEach(
                        device =>
                        {
                            let data = new EntityToService<MobileAlertDeviceIdentity>();
                            data.entity = device.identity;
                            this.http.PostRequest("api/device/discard", data);
                        }
                    );
                }
                this.clearSelection();
            }
        );
    }
} 

