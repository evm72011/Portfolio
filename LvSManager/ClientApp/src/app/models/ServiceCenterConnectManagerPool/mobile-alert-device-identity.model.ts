import { MobileAlertDevicePushNotificationTokenTypes } from "./enum-mobile-alert-device-push-notification-token-types";

export class MobileAlertDeviceIdentity
{
    public alertAddress?: string;
    public deviceId?: string;
    public issi?: string;
    public opta?: string;
    public pushNotificationToken?: string;
    public pushNotificationTokenType?: MobileAlertDevicePushNotificationTokenTypes;
}