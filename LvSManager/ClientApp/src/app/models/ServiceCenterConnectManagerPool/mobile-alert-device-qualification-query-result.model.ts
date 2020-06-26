import { CloudQueryResult } from "../ServiceCenterConnectControllerPool/cloud-query-result.model";
import { MobileAlertDeviceQualification } from "./mobile-alert-device-qualification.model";

export class MobileAlertDeviceQualificationQueryResult extends CloudQueryResult
{
    public qualifications?: MobileAlertDeviceQualification[]; 
}