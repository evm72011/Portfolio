import { Component } from '@angular/core';
import { ApplicationService, ModalForm } from "../app.common/application.service";
import { SessionService } from "../app.session/session.service";

import { DeviceRepository } from "./device.repository.service";
import { QualificationRepository } from "../app.qualification/qualification.repository.service";
import { MobileAlertDeviceEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-entry.model";
import { MobileAlertDeviceQualification } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification.model";
import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";

/**
 * Component for adding and editing devices
 */
@Component({
    selector: 'app-add-device',
    templateUrl: './add-device.component.html',
    styleUrls: [
        '../app.common/css/fade-animation.css', 
        '../app.common/css/dialog.css', 
        '../app.common/css/input-dialog.css', 
        './add-device.component.css']
  })
export class AddDeviceComponent {
    private inputStarted: boolean = false;

    public Caption: string = "Erstellung";
    public Device: MobileAlertDeviceEntry = new MobileAlertDeviceEntry();
    public InputErrorMsg: string = "";
    public bitmaskSMS:      boolean = false;
    public bitmaskTelegram: boolean = false;
    public bitmaskSpeach:   boolean = false;
    public qualifications: MobileAlertDeviceQualification[] = []; // List of qualifications showed in the form as a set of checkboxes

    constructor( 
        public session: SessionService,
        public application: ApplicationService,
        public deviceRepository: DeviceRepository,
        private qualificationRepository: QualificationRepository) 
    {
        this.qualificationRepository.GetData();
        this.deviceRepository.ValidationResult.fieldRemarks = [];
        if (this.application.Modal == ModalForm.DeviceEdit)
        {
            this.Caption = "Bearbeitung";
            this.Device.Assign(<MobileAlertDeviceEntry>this.application.CommonObject);
            this.bitmaskTelegram    = (this.Device.additionallyAllowedTelegramWaysBitMask & 2) != 0;
            this.bitmaskSpeach      = (this.Device.additionallyAllowedTelegramWaysBitMask & 4) != 0;
            this.bitmaskSMS         = (this.Device.additionallyAllowedTelegramWaysBitMask & 8) != 0;
            this.ValidateForm();
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
        {
            if (this.Device.stationPosition) 
                this.Device.stationPosition.PrepareForSending();
            this.deviceRepository.SendToServer<MobileAlertDeviceEntry>("api/device/write",this.Device);
        }
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
        if (this.Device.stationPosition) 
            this.Device.stationPosition.PrepareForSending();
        this.deviceRepository.Valid<MobileAlertDeviceEntry>("/api/device", this.Device);
    }

    /**
     * Enabed or disabled OK button is (there are crytical errors after validation).
     */
    public DisabledOkButton(): boolean
    {
        return (this.deviceRepository.ValidationResult.fieldRemarks.filter(x => x.violation == 3).length != 0) || (!this.inputStarted);
    }

    /**
     * Converts selected Checkboxes to bitmask for the field additionallyAllowedTelegramWaysBitMask
     */
    public BitmaskChange()
    {
        this.Device.additionallyAllowedTelegramWaysBitMask = 0;
        if (this.bitmaskTelegram)   this.Device.additionallyAllowedTelegramWaysBitMask |= 2;
        if (this.bitmaskSpeach)     this.Device.additionallyAllowedTelegramWaysBitMask |= 4;
        if (this.bitmaskSMS)        this.Device.additionallyAllowedTelegramWaysBitMask |= 8;
        this.ValidateForm();
    }

    /**
     * Opens in Browser new tab with Google Maps 
     * */
    public ShowInGoogleMaps(){
        let lat = this.Device.stationPosition.latitude;
        let lon = this.Device.stationPosition.longitude;
        let url = "https://www.google.de/maps/dir//" + lat + "," + lon + "/@" + lat + "," + lon + ",15z";
        window.open(url, "_blank");
    }

    /**
     * Enabed or disabled "Show in Google map" button is (is position entered or not).
     */
    public ShowInMapButtonDisabled(): boolean
    {
        return !(this.Device.stationPosition && 
                 this.Device.stationPosition.latitude &&
                 this.Device.stationPosition.longitude);
    }

    /**
     * Sends string processBehaviours representation to the html template
     */
    public ProcessBehaviour(): string
    {
        if (this.application.CommonObject)
            return (<MobileAlertDeviceQueryEntry>this.application.CommonObject).processBehavioursStr();
    }

    //------------------------------------------    Qualifications    ----------------------------------------//
    /**
     * Fills this.qualifications array.
     * Fills with all existing in the cloud qualifications and entered in the form's field
     */
    private fillQualification()
    {
        this.qualifications = [];
        this.qualificationRepository.Data.forEach(q => this.qualifications.push(q));
        this.Device.Qualifications().forEach(
            x => 
            {
                if (x && 
                    (this.qualifications.filter(q => (q.name == x)).length == 0))
                {
                    let qualification = new MobileAlertDeviceQualification();
                    qualification.name = x;
                    this.qualifications.push(qualification)
                }
            }
        );
    }

    /**
     * Event: changed the information about qualifications in input field or 
     * the page control with qualifications selected (needed for correct form behaviour because of async)
     * Refreshes this.qualifications array.
     * Runs form validation if needed
     * @param withoutFormValidation Event
     */
    public QualificationFieldChanged(validateForm: boolean = false)
    {
        this.fillQualification();
        this.qualifications.forEach(
            q => {
                q.selected = this.Device.Qualifications().filter(x => (q.name == x)).length > 0;
            }
        );
        this.qualificationCheckBoxesRefresh();
        if (validateForm) this.ValidateForm();
    }

    /**
     * Event: Checkbox values are changed in qualifications set
     * Change the text in Input qualification field 
     */
    public QualificationCheckboxChanged()
    {
        this.qualificationFieldRefresh();
        this.OrderQualificationField();
    }

    /**
     * Refresh checkboxes status (checked or not) in the form
     */
    private qualificationCheckBoxesRefresh()
    {
        this.qualifications.forEach(
            q => {
                q.selected = this.Device.Qualifications().filter(x => (q.name == x)).length > 0;
            }
        );
    }

    /**
     * Changes qualifications text status of checkboxes (checked or not)
     */
    private qualificationFieldRefresh()
    {
        this.Device.qualifications = "";
        this.qualifications.forEach(
            q =>
            {
                if (q.selected)
                    if (this.Device.qualifications == "")
                        this.Device.qualifications = q.name
                    else
                        this.Device.qualifications += ", " + q.name;
            });
    }

    /**
     * Sorts qualifications in text representation remove double ones
     */
    public OrderQualificationField()
    {
        let result = "";
        let items = [];
        this.Device.Qualifications().forEach(
            x => 
            {
                if (!items.includes(x)) items.push(x);
            });
        items.forEach(
            x => 
            {
                if (result == "")
                    result = x;
                else
                    result += ", " + x;
            });
        this.Device.qualifications = result;
        this.ValidateForm();
    }
}