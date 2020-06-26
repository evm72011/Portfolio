import { Injectable } from "@angular/core";

import { ApplicationService } from "../app.common/application.service";
import { RequestService } from "../app.common/request.service";
import { RepositoryPrototype } from "../models/repository-prototype.model";
import { DeviceFilter } from "../models/device-filter.model";
import { EntityToService } from "../models/entity-to-service.model";

import { MobileAlertDeviceQueryResult } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-result.model";
import { MobileAlertDeviceQueryEntry } from "../models/ServiceCenterConnectManagerPool/mobile-alert-device-query-entry.model";

/**
 * Injectable servise as repository pattern for MobileAlertDevices.
 */
@Injectable()
export class DeviceRepository extends RepositoryPrototype{

    public filter: DeviceFilter = new DeviceFilter();
    public Data: MobileAlertDeviceQueryEntry[] = [];
    public Qualifications: string[];

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
        let data = new EntityToService<object>();

        let operation = (response: MobileAlertDeviceQueryResult) =>
        {
            this.Data = [];
            this.application.DeviceCountTotal = response.resources.length;
//            for (let i = 0; i < 100; i++)     
            response.resources.forEach(item => 
                {
                    let targetObject = new MobileAlertDeviceQueryEntry();
                    targetObject.Assign(item);
                    //Object.assign(targetObject, item);
                    this.Data.push(targetObject);
                });
            this.applyFilter();
            this.applySorting();
        }
        this.http.PostRequest<MobileAlertDeviceQueryResult>("/api/device/get", data, operation);
    }

    /**
     * Applies filter to the data set
     */
    private applyFilter()
    {
        if (this.filter.telegramWay !== -1)
            this.Data = this.Data.filter(x => (x.telegramWay == this.filter.telegramWay));
        if (this.filter.searchText !== "")
            this.Data = this.Data.filter(x => x.containText(this.filter.searchText));
                        
        this.fillQualifications();
        if (!this.Qualifications.includes(this.filter.qualification))
            this.filter.qualification = "--";
        if (this.filter.qualification !== "--")
            this.Data = this.Data.filter(x => x.Qualifications().includes(this.filter.qualification));    
    }

    /**
     * Applies sorting to the data set
     */
    private applySorting()
    {
        let mult = this.filter.ascendingSort ? 1 : -1;
        var operation;
        if (this.filter.sorfingField == "alertAddress")
            operation = (a, b) => mult * a.identity.alertAddress.localeCompare(b.identity.alertAddress)
        else if (this.filter.sorfingField == "qualifications")
            operation = (a, b) => mult * a.qualifications.localeCompare(b.qualifications)
        else if (this.filter.sorfingField == "station")
            operation = (a, b) => mult * a.station.localeCompare(b.station)
        else if (this.filter.sorfingField == "visibility")
            operation = (a, b) => mult * a.visibility.localeCompare(b.visibility)
        else
        { 
            this.filter.sorfingField = "name";
            operation = (a, b) => mult * a.name.localeCompare(b.name)
        }
        this.Data.sort(operation)
    } 

    /**
     * Filling the list of all qualificatuions from actual (after filtering) data set.
     * This list is used in the device-form (dropdownlist for additional filtering).
     */
    private fillQualifications()
    {
        this.Qualifications = [];
        this.Data.forEach(
            device => 
            {
                device.Qualifications().forEach(item =>
                {
                    if ((!this.Qualifications.includes(item.trim())) && (item.length > 0))
                        this.Qualifications.push(item.trim());
                });
            });
        this.Qualifications.sort();
    }
}