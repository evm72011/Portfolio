import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { ApplicationService, AppMode, DialogType } from "../app.common/application.service";
import { RequestService } from "../app.common/request.service";

import { CloudLogOnData } from "../models/ServiceCenterConnectControllerPool/cloud-log-on-data.model";
import { CloudUserGrantSetQueryResult } from "../models/ServiceCenterConnectControllerPool/cloud-user-grant-set-query-result.model";
import { OperationMethodResult } from "../models/ServiceCenterConnectControllerPool/operation-method-result.model";
import { CloudUserSession } from "../models/ServiceCenterConnectControllerPool/cloud-user-session.model";
import { CloudControllerFeature } from "../models/ServiceCenterConnectControllerPool/cloud-controller-feature.model";
import { CloudControllerFeaturePolicyQueryResult } from "../models/ServiceCenterConnectManagerPool/cloud-controller-feature-policy-query-result.model";

/**
 * Component for work with user's logon session
 */
@Injectable({
    providedIn: 'root'
  })
export class SessionService {

    private url = "/api/session";
    private cloudUserGrantSetQueryResult: CloudUserGrantSetQueryResult;

    public cloudLogOnData: CloudLogOnData; 
    
    constructor(
        private http: RequestService, 
        private application: ApplicationService)
    { 
        this.cloudLogOnData = new CloudLogOnData;
        this.cloudUserGrantSetQueryResult = new CloudUserGrantSetQueryResult;
    }

    /**
     * Attemts to logon the user
     */
    public SessionLogOn() {
        this.cloudLogOnData.sessionLifetimeInMinutes = 5;
        let data = {
            session: null,
            entity: this.cloudLogOnData
        }
        let operation_ok = (response: CloudUserGrantSetQueryResult) =>
        {
            Object.assign(this.cloudUserGrantSetQueryResult, response);
            this.application.CloseModalForm();
            this.application.SetMode(AppMode.Device);
            this.application.MustLogOn = false;
            this.application.Session = this.cloudUserGrantSetQueryResult.session; 
            this.detectDeviceNumberLimit();
        }

        let operation_err = (err: HttpErrorResponse) =>
        {
            this.cloudUserGrantSetQueryResult.successfullyCompleted = false;
            this.cloudUserGrantSetQueryResult.errorText = err.message;
        }

        this.http.PostRequest(this.url + "/logon", data, operation_ok, operation_err);

        localStorage.setItem("clientIdentity", this.cloudLogOnData.clientIdentity);
        localStorage.setItem("userLogOnName",  this.cloudLogOnData.userLogOnName);
    }

    /**
     * Kills the current user's session
     */
    public SessionLogOff() {
        let data = {
            session: this.Session()
        }

        let operation = (response: OperationMethodResult) =>
        {
            this.cloudUserGrantSetQueryResult.successfullyCompleted = false;
            this.cloudUserGrantSetQueryResult.session = null;
            this.cloudLogOnData.Clear();
            this.application.SetMode(AppMode.Unlogged);
        }
        this.http.PostRequest<OperationMethodResult>(this.url + "/logoff", data, operation);
    }

    /**
     * Sends data to the backend for changing user's password
     * @param password 
     */
    public SessionChangeUserPassword(password: string){
        let data = {
            session: this.Session(true),
            entity1: this.cloudLogOnData.userPassword, 
            entity2: password
        }

        let operation = (response: OperationMethodResult) =>
        {
            this.cloudLogOnData.userPassword = data.entity2;
            this.application.CloseModalForm();
            this.application.ShowDialog(DialogType.Info, "Das Passwort ist erfolgreich geändert worden.");
        }
        this.http.PostRequest<OperationMethodResult>(this.url + "/password", data, operation);
    }

    /**
     * Refreshes the current user's session
     */
    private sessionUpdate()
    {
        let data = {
            session: this.Session(false)
        }
        this.http.PostRequest<OperationMethodResult>(this.url + "/update", data, null);
    }

    /**
     * Returns current usser's session information and updates the session if needed 
     * @param update - update or not the sesion after demand
     */
    public Session(update: boolean = true): CloudUserSession
    {
        if (this.cloudUserGrantSetQueryResult.successfullyCompleted !== true) return null;
        if (update) this.sessionUpdate();
        return this.application.Session;
    }

    /**
     * Detects maximal allowed number of devices for this user's clientIdentity
     */
    private detectDeviceNumberLimit()
    {
        let data = {
            session: this.Session(true),
            entity: new CloudControllerFeature() 
        }
        // All needed settings of CloudControllerFeature for device limit are default values for class CloudControllerFeature
        // see determination for class CloudControllerFeature

        let operation = (response: CloudControllerFeaturePolicyQueryResult) =>
        {
            this.application.DeviceCountLimit = response.valueNumber;
        }
        this.http.PostRequest<CloudControllerFeaturePolicyQueryResult>(this.url + "/feature-number", data, operation);        
    }
}