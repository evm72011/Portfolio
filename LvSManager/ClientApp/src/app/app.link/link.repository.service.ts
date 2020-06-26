import { Injectable } from "@angular/core";

import { ApplicationService } from "../app.common/application.service";
import { RequestService } from "../app.common/request.service";
import { RepositoryPrototype } from "../models/repository-prototype.model";
import { EntityToService } from "../models/entity-to-service.model";

import { MobileAlertDeviceSpreadGroup} from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group.model"
import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";
import { MobileAlertDeviceSpreadGroupLinkToAlertDevice } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group-link-to-alert-device.model";
import { MobileAlertDeviceSpreadGroupLinkToAlertDeviceQueryResult } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-spread-group-link-to-alert-device-query-result.model";

/**
 * Injectable servise as repository pattern for links between SpreadGroups and AlertDevices.
 */
@Injectable()
export class LinkRepository extends RepositoryPrototype{

    public Data: MobileAlertDeviceSpreadGroupLinkToAlertDevice[] = [];

    /**
     * Create the instance of the repository
     * @param http 
     * @param application 
     */  
    constructor(http: RequestService, application: ApplicationService)
    {
        super(http, application);
    }

    /**
     * Gets dataset from backend
     */        
    public GetData()
    {
        let data = new EntityToService<Object>();
        let operation = (response: MobileAlertDeviceSpreadGroupLinkToAlertDeviceQueryResult) =>
        {
            this.Data = [];
            response.links.forEach(item => 
                {
                    let targetObject = new MobileAlertDeviceSpreadGroupLinkToAlertDevice();
                    Object.assign(targetObject, item);
                    this.Data.push(targetObject);
                });
        }
        this.http.PostRequest<MobileAlertDeviceSpreadGroupLinkToAlertDeviceQueryResult>("/api/link/get", data, operation);
    }

    /**
     * Shows that a SpreadGroups and an AlertDevices are connected or not.
     * @param group 
     * @param device 
     */
    public LinkExist(group: MobileAlertDeviceSpreadGroup, device: MobileAlertDeviceQueryEntry): boolean
    {
        let data = 
            this.Data.filter(
                link => ((group.identity == link.spreadGroupIdentity) && 
                         (device.identity.deviceId == link.alertDeviceIdentity))
            );
        return (data.length > 0);
    }
}