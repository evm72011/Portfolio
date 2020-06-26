import { CloudQueryResult } from "../ServiceCenterConnectControllerPool/cloud-query-result.model";

export class CloudControllerFeaturePolicyQueryResult extends CloudQueryResult
{
    public featureIdentity?: string;
    public permissionGranted?: boolean;
    public valueData?: ArrayBuffer;

    public valueNumber: number;
}