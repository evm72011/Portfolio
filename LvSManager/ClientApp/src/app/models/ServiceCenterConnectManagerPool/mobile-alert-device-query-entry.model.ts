import { MobileAlertDeviceEntry } from "./mobile-alert-device-entry.model";
import { MobileAlertDeviceProcessBehaviours } from "./enum-mobile-alert-device-process-behaviours";

export class MobileAlertDeviceQueryEntry extends MobileAlertDeviceEntry
{
    public clientIdentity?: string;
    public isAuthorizationTokenAssigned?: boolean;
    public isPinAssigned?: boolean;
    public processBehaviours?: MobileAlertDeviceProcessBehaviours = 0;
    public hidden?: boolean = false;

    /**
     * Represents processBehaviours as a string for an output
     */
    public processBehavioursStr(): string
    {
        if (this.processBehaviours == MobileAlertDeviceProcessBehaviours.SuspendAlertNotification)
            return "SuspendAlertNotification";
        else if (this.processBehaviours == MobileAlertDeviceProcessBehaviours.SendFeedbackNotAvailableAutomatically)
            return "SendFeedbackNotAvailableAutomatically";
        else
            return "Keine Angabe";
    }
}