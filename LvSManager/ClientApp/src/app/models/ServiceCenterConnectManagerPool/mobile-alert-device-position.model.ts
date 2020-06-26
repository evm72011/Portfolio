import { MobileAlertDeviceGeographicalPosition } from "./mobile-alert-device-geographical-position.model";
export class MobileAlertDevicePosition extends MobileAlertDeviceGeographicalPosition
{
    public quality?: number; // enum MobileAlertDevicePositionQualities 
    public timestampUtc?: Date;
}
