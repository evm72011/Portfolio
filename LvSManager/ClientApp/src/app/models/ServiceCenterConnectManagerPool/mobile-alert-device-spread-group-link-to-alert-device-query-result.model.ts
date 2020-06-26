import { CloudQueryResult } from "../ServiceCenterConnectControllerPool/cloud-query-result.model";
import { MobileAlertDeviceSpreadGroupLinkToAlertDevice } from "./mobile-alert-device-spread-group-link-to-alert-device.model";

export class MobileAlertDeviceSpreadGroupLinkToAlertDeviceQueryResult extends CloudQueryResult
{
    public links?: MobileAlertDeviceSpreadGroupLinkToAlertDevice[] = [];
}