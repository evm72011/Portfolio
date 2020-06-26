import { MobileAlertDeviceIdentity } from "./mobile-alert-device-identity.model";
import { MobileAlertDevicePosition } from "./mobile-alert-device-position.model";
import { MobileAlertDeviceGeographicalPosition } from "./mobile-alert-device-geographical-position.model";
import { MobileAlertDevicePushNotificationTokenTypes } from "./enum-mobile-alert-device-push-notification-token-types";
import { MobileAlertDeviceTelegramWays } from "./enum-mobile-alert-device-telegram-ways";

export class MobileAlertDeviceEntry{
    public additionallyAllowedTelegramWaysBitMask?: number;
    public description?: string;
    public identity?: MobileAlertDeviceIdentity = new MobileAlertDeviceIdentity();
    public lastChangeTimestampUtc?: Date;
    public name?: string = "";
    public position?: MobileAlertDevicePosition = new MobileAlertDevicePosition();
    public qualifications?: string = "";
    public station?: string;
    public stationPosition?: MobileAlertDeviceGeographicalPosition = new MobileAlertDeviceGeographicalPosition();
    public telegramWay?: MobileAlertDeviceTelegramWays = MobileAlertDeviceTelegramWays.None;
    public visibility?: string; 

    /**
     * returns list of all device qualifications
     */
    public Qualifications(): string[] 
    {
        let result = [];
        if ((this.qualifications === null) || (this.qualifications === undefined))
            return result;
        this.qualifications.split(",")
            .map(x => x.trim())
            .sort().forEach(
                x =>
                {
                    result.push(x);
                });
        return result;
    }

    /**
     * Compares alert devices with other ones
     * @param x device to compare
     */
    public equal(x: MobileAlertDeviceEntry): boolean
    {
        if (!x || !this.identity) return false;
        return this.identity == x.identity;
    }

    /**
     * Copies properties from one service to another 
     * @param source - source of information
     */
    public Assign(source: MobileAlertDeviceEntry)
    {
        Object.assign(this, source);
        this.identity = new MobileAlertDeviceIdentity;
        if (source.identity)
            Object.assign(this.identity, source.identity);
        this.position = new MobileAlertDevicePosition;
        if (source.position)
            Object.assign(this.position, source.position);
        this.stationPosition = new MobileAlertDeviceGeographicalPosition;
        if (source.stationPosition)
            Object.assign(this.stationPosition, source.stationPosition);
    }
    
    /**
     * Represents token's information as a string for output 
     */
    public TokenToString(): string
    {
        if (!this.identity) return "Keine angaben";
        let result = "";
        if (this.identity.pushNotificationTokenType == MobileAlertDevicePushNotificationTokenTypes.GoogleFirebase)
        {
            result = "Google Firebase: "
        }
        else if (this.identity.pushNotificationTokenType == MobileAlertDevicePushNotificationTokenTypes.ApplePushNotificationService)
        {
            result = "Apple (APNS): "
        }

        if (!this.identity.pushNotificationToken)
        {
            result += this.identity.pushNotificationToken;        
        }
        if (result.length > 0)
            return result;
        else
            return "Keine angaben";
    }

    /**
     * Shows contains alert device searchText in followed fields: alertAddress, name, qualifications, station, visibility
     * @param searchText - searched text (case insensitive)
     */
    public containText(searchText: string): boolean
    {
        if (!searchText) return true;
        let str = this.identity.alertAddress + 
            this.name + 
            this.qualifications + 
            this.station + 
            this.visibility;
        str = str.toUpperCase();
        return str.includes(searchText.toUpperCase());
    }

    /**
     * Represents telegram way information as a string for output 
     */
    public TelegramWayToString(): string
    {
        if (this.telegramWay == MobileAlertDeviceTelegramWays.None)
            return "ohne Alarmierung";
        if (this.telegramWay == MobileAlertDeviceTelegramWays.TelegramQueue)
            return "Pager Alarmierung";
        if (this.telegramWay == MobileAlertDeviceTelegramWays.SpeechSynthesis)
            return "Telefonalarmierung";
        if (this.telegramWay == MobileAlertDeviceTelegramWays.ShortMessageService)
            return "SMS Alarmierung";
        return "";
    }

    /**
     * Returns file name for corresponded device ico
     */
    public getIco(): string
    {
        let result = "";//"../../assets/";

        if (this.telegramWay == MobileAlertDeviceTelegramWays.TelegramQueue)
            result += "alarm-pager.png";
        else if (this.telegramWay == MobileAlertDeviceTelegramWays.SpeechSynthesis)
            result += "alarm-phone.png";
        else if (this.telegramWay == MobileAlertDeviceTelegramWays.ShortMessageService)
            result += "alarm-sms.png";
        else 
            result += "empty.png";
        return result;
    }

}