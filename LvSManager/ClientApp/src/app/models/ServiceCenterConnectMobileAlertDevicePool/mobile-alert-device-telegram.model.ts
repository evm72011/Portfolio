import { CloudColor } from "./cloud-color.model";
import { MobileAlertDeviceTelegramIdentity } from "./mobile-alert-device-telegram-identity.model";
import { MobileAlertDeviceTelegramTypes } from "./enum-mobile-alert-device-telegram-types";
import { MobileAlertDeviceTelegramWays } from "../ServiceCenterConnectManagerPool/enum-mobile-alert-device-telegram-ways";
import { MobileAlertDeviceTelegramPosition } from "./mobile-alert-device-telegram-position.model";

export class MobileAlertDeviceTelegram
{
    public alertColor: CloudColor;
    public alertText: string;
    public alertTimeUtc: Date;
    public expiryTimestampUtc: Date;
    public identity: MobileAlertDeviceTelegramIdentity;
    public isIncidentFinished: boolean                              = false;
    public isTrigger: boolean                                       = true;
    public telegramType: MobileAlertDeviceTelegramTypes             = MobileAlertDeviceTelegramTypes.None;
    public telegramWayModification: MobileAlertDeviceTelegramWays   = MobileAlertDeviceTelegramWays.None;
    public wherePosition: MobileAlertDeviceTelegramPosition         = new MobileAlertDeviceTelegramPosition();
}