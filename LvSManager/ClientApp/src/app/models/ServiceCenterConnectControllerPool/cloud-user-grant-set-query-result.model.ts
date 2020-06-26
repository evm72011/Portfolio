import { CloudQueryResult } from "./cloud-query-result.model";
import { CloudUserPermissionSet } from "./cloud-user-permission-set.model";
import { CloudUserSession } from "./cloud-user-session.model";

export class CloudUserGrantSetQueryResult extends CloudQueryResult
{
    public permissionSet?: CloudUserPermissionSet;
    public session?: CloudUserSession;
}