import { CloudControllerFeatureValueTypes } from "./enum-cloud-controller-feature-value-types";

export class CloudControllerFeature
{
    public applicationName: string = "WEB - Alarmgerätemanagement";
    public description?: string;
    public identity: string = "FeatureAlertDeviceManagement";
    public name: string = "Gerätelimit";
    public valueData?: ArrayBuffer;
    public valueType: CloudControllerFeatureValueTypes = CloudControllerFeatureValueTypes.Integer;
}