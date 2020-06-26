import { Injectable } from "@angular/core";

import { RequestService } from "../app.common/request.service";
import { ApplicationService } from "../app.common/application.service";
import { EntityToService } from "../models/entity-to-service.model";

import { OperationMethodResult } from "../models/ServiceCenterConnectControllerPool/operation-method-result.model";
import { CloudValidationCheckQueryResult } from "./ServiceCenterConnectManagerPool/cloud-validation-check-query-result.model";
import { CloudEditingFieldRemark } from "./ServiceCenterConnectManagerPool/cloud-editing-field-remark.model";

/**
 * Parent class for all repositories (pattern for CRUD operations). 
 * All repositories are Angular's injectable services.
 */
@Injectable()
export abstract class RepositoryPrototype{

    public ValidationResult: CloudValidationCheckQueryResult = new CloudValidationCheckQueryResult();

    constructor(
        protected http: RequestService,
        protected application: ApplicationService) {}

    /**Gets entities from backend. Realisations are in child classes. */
    abstract GetData();
    
    /**
     * Wraps object as an EntityToService, sends it to the backend and updates data set
     * @param url - url for backend's controller method
     * @param obj - sended entity
     */
    public SendToServer<T>(url: string, obj: T)
    {
        let data = new EntityToService<T>();
        data.entity = obj;

        let operation = (response: OperationMethodResult) =>
        {
            this.GetData();
        }
        this.http.PostRequest(url, data, operation);    
    }

    /**
     * Wraps object as an EntityToService, sends it to the backend for validation in WCS-sercise and fills list of validation remarks 
     * @param url 
     * @param obj 
     */
    public Valid<T>(url: string, obj: T)
    {
        let data = new EntityToService<T>();
        data.entity = obj;
        let operation = (response: CloudValidationCheckQueryResult) => 
        {
            this.ValidationResult = new CloudValidationCheckQueryResult();
            response.fieldRemarks.forEach(
                x => {
                    let remark = new CloudEditingFieldRemark();
                    Object.assign(remark, x);
                    this.ValidationResult.fieldRemarks.push(remark);
                }

            );
        };
        this.http.PostRequest<CloudValidationCheckQueryResult>(url + "/valid", data, operation);
    }
}