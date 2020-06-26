import { CloudQueryResult } from "../ServiceCenterConnectControllerPool/cloud-query-result.model";
import { MobileAlertDeviceSpreadGroup } from "./mobile-alert-device-spread-group.model";

export class MobileAlertDeviceSpreadGroupQueryResult extends CloudQueryResult
{ 
    public spreadGroups?: MobileAlertDeviceSpreadGroup[];
}