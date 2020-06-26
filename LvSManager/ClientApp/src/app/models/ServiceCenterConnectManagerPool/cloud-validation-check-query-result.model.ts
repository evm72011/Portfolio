import { CloudQueryResult } from "../ServiceCenterConnectControllerPool/cloud-query-result.model";
import { CloudEditingFieldRemark } from "./cloud-editing-field-remark.model";

export class CloudValidationCheckQueryResult extends CloudQueryResult
{
    public fieldRemarks?: CloudEditingFieldRemark[] = [];

    /**
     * Returns class for css styling for elements according to validation result 
     * Used for html elements (Inputs ar Tabcontrols)
     * @param fields - list of filds to consideration
     */
    public mapClassValidationSet(fields: string[]): Object
    {
        let remarks = this.fieldRemarks.filter(remark => fields.includes(remark.propertyName));
        if (remarks.filter(remark => remark.violation == 3).length > 0) return {"field-valid-error": true};
        if (remarks.filter(remark => remark.violation == 2).length > 0) return {"field-valid-warning": true};
        if (remarks.filter(remark => remark.violation == 1).length > 0) return {"field-valid-hint": true};
        return {}
    }

    /**
     * Returs css style for showing / hiding validation block
     */
    public mapStyleValidationBlock() : Object
    {
        if ((this.fieldRemarks.length == 0)) 
            return {display: "none"};
        else
            return {};
    }
}