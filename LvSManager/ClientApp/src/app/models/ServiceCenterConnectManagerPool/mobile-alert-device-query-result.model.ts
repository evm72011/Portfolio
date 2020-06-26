import { CloudQueryResultVersion } from "../ServiceCenterConnectControllerPool/cloud-query-result-version.model";
import { MobileAlertDeviceQueryEntry } from "./mobile-alert-device-query-entry.model";
import { CloudQueryResult } from "../ServiceCenterConnectControllerPool/cloud-query-result.model";

export class MobileAlertDeviceQueryResult extends CloudQueryResult{
    public dataVersion?: CloudQueryResultVersion;
    public differentialData?: boolean;
    public resources?: MobileAlertDeviceQueryEntry[];
}