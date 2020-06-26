import { MobileAlertDeviceTelegramWays } from "./ServiceCenterConnectManagerPool/enum-mobile-alert-device-telegram-ways";

/**
 * Contains information about filtering conditions for devices
 */
export class DeviceFilter
{
    public telegramWay: number = -1;
    public qualification: string = "--";
    public searchText: string = "";
    public sorfingField: string = "";
    public ascendingSort: boolean = true;

    /**
     * Clear the filter
     */
    public Clear()
    {
        this.telegramWay = -1;
        this.qualification = "--";
        this.searchText = "";
    }

    /**
     * Returns string representation for selected telegram way 
     */
    public TelegramWayToString(): string
    {
        if (this.telegramWay == -1)
            return "Alle Typen";
        else if (this.telegramWay == MobileAlertDeviceTelegramWays.TelegramQueue)
            return "Pager";
        else if (this.telegramWay == MobileAlertDeviceTelegramWays.SpeechSynthesis)
            return "Telefon";
        else if (this.telegramWay == MobileAlertDeviceTelegramWays.ShortMessageService)
            return "SMS";
        else
            return "Error";
    }
}