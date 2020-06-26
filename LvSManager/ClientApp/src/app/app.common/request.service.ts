import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApplicationService, AppMode, ModalForm, DialogType } from "./application.service";

import { CloudQueryResult } from "../models/ServiceCenterConnectControllerPool/cloud-query-result.model";
import { IEntityToService } from "../models/entity-to-service.model";

/**
 * Provides sending requests to backend service and work with responses. 
 * Also checks that the session is not expired and shoes dialogs with error messages.
 */
@Injectable({
    providedIn: 'root',
  })
export class RequestService{
    private expiredMsg = [
        "Die Session konnte nicht gefunden werden!\r\nParametername: sessionIdentity",
        "Die Session ist bereits abgelaufen!\r\nParametername: sessionIdentity"]

    constructor(
        private http: HttpClient, 
        private application: ApplicationService)
    {}

    /**
     * Wrapping for Post request to backend.
     * Performs as common task (show error dialog, switch to unlogged state)
     * as user's ones (operation_ok and operation_err methods)
     * @param url - url to backend controller method
     * @param data - sending EntityToService object
     * @param operation_ok - if response status is successfullyCompleted, default = null
     * @param operation_err - if response status is not successfullyCompleted, default = null
     */
    public PostRequest<T extends CloudQueryResult>(url: string, 
        data: IEntityToService, 
        operation_ok:  (x: T)                 => void = null, 
        operation_err: (x: HttpErrorResponse) => void = null) 
    {
        if (!data.session) 
            data.session = this.application.Session;

        this.http.post<T>(url, data).subscribe(
            response =>
            {
                if (response.successfullyCompleted)
                {
                    if (operation_ok) operation_ok(response);
                }
                else
                {
                    if (this.expiredMsg.includes(response.errorText)) 
                    {
                        console.log("Session expired!");
                        this.application.SetMode(AppMode.Unlogged)
                        this.application.ShowModalForm(ModalForm.Logon);
                    }
                    else
                    {
                        this.application.ShowDialog(DialogType.Error, response.errorText);
                    }
                }
            },
            err =>
            {
                this.application.ShowDialog(DialogType.Error, err.message);
                if (operation_err) operation_err(err);
            }
        );
    }
}