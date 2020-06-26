import { Injectable } from "@angular/core";

import { RequestService } from "../app.common/request.service";
import { ApplicationService } from "../app.common/application.service";
import { RepositoryPrototype } from "../models/repository-prototype.model";
import { EntityToService } from "../models/entity-to-service.model";
import { GroupFilter }  from "../models/group-filter.model";

import { MobileAlertDeviceSpreadGroupQueryResult } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group-query-result.model";
import { MobileAlertDeviceSpreadGroup} from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group.model"

/**
 * Injectable servise as repository pattern for SpreadGroups.
 */
@Injectable()
export class GroupRepository extends RepositoryPrototype{

    public Data: MobileAlertDeviceSpreadGroup[] = [];
    public filter: GroupFilter = new GroupFilter();

    /**
     * Create the instance of the repository
     * @param http 
     * @param application 
     */    
    constructor(http: RequestService, application: ApplicationService){
        super(http, application);
    };

    /**
     * Gets dataset from backend
     */    
    public GetData()
    {
        let data = new EntityToService<Object>();

        let operation = (response: MobileAlertDeviceSpreadGroupQueryResult) =>
        {
            this.Data = [];
//          for (let index = 0; index < 100; index++)
            response.spreadGroups.forEach(item =>
                {
                    let targetObject = new MobileAlertDeviceSpreadGroup();
                    Object.assign(targetObject, item);
                    this.Data.push(targetObject);
                });
            this.applyFilter();
            this.applySorting()
        }
        this.http.PostRequest<MobileAlertDeviceSpreadGroupQueryResult>("/api/group/get", data, operation);
    }

    /**
     * Applies filter to the data set
     */    
    private applyFilter()
    {
        if (this.filter.name !== "")
        this.Data = this.Data.filter(x => x.name.toUpperCase().includes(this.filter.name.toUpperCase()));
    }

    /**
     * Applies sorting to the data set
     */    
    private applySorting()
    {
        this.Data.sort((a,b) => a.name.localeCompare(b.name));
    }
}
