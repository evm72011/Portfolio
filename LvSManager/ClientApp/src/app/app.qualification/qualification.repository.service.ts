import { Injectable } from "@angular/core";

import { RequestService } from "../app.common/request.service";
import { ApplicationService } from "../app.common/application.service";
import { RepositoryPrototype } from "../models/repository-prototype.model";
import { EntityToService } from "../models/entity-to-service.model";

import { MobileAlertDeviceQualificationQueryResult } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification-query-result.model";
import { MobileAlertDeviceQualification } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-qualification.model";


@Injectable()
export class QualificationRepository extends RepositoryPrototype{

    public Data: MobileAlertDeviceQualification[] = [];

    constructor(http: RequestService, application: ApplicationService){
        super(http, application);
    };
    
    public GetData()
    {
        let data = new EntityToService<Object>();

        let operation = (response: MobileAlertDeviceQualificationQueryResult) =>
        {
            this.Data = [];
            response.qualifications.forEach(item =>
            {
                let targetObject = new MobileAlertDeviceQualification();
                Object.assign(targetObject, item);
                this.Data.push(targetObject);
            });
            this.applySorting();
        }
        this.http.PostRequest<MobileAlertDeviceQualificationQueryResult>("/api/qualification/get", data, operation);
    }
    
    private applySorting()
    {
        this.Data.sort((a,b) => a.name.localeCompare(b.name));
    }
}



/*
Comments:

export class QualificationRepository extends RepositoryPrototype{
    Injectable servise as repository pattern for qualifications.

public GetData()
    Getting list of qualifications from backend.

*/