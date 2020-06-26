import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { CloudUserSession } from "../models/ServiceCenterConnectControllerPool/cloud-user-session.model";
import { ICommonComponent } from "../models/common.component.interface.model";

export enum AppMode {
    Main, Unlogged, Device, Group, Link, Qualification
}

export enum ModalForm {
    None, Dialog, Logon, Logoff, ChangePassword, 
    GroupAdd, GroupEdit, DeviceAdd, DeviceEdit, DeviceFillPosition, DevicePinRights,
    QualificationAdd, QualificationEdit, SendAlert
}

export enum DialogType{
    Error, Warning, Info
}

/**
 * The main services of this Angular application (AA below).
 * Used for data exchanging between other parts of AA and common AA behaviour 
 */
@Injectable({
    providedIn: 'root',
  })
export class ApplicationService{
    private oldModalForm: ModalForm = ModalForm.None;

    public Caption: string = "Anmeldung";

    public AddButtonEnabled: boolean = true;
    public EditButtonEnabled: boolean = false;
    public DelButtonEnabled:  boolean = false;

    public MustLogOn: boolean = true;
    
    public ActiveComponent: ICommonComponent;
    public CommonObject: Object;
    public Session: CloudUserSession;
    public DeviceCountTotal: number = 0;
    public DeviceCountLimit: number = 50;
    
    public Modal: ModalForm = ModalForm.Logon;
    public ModalResult: Subject<boolean>;
    public Mode: AppMode = AppMode.Unlogged;

    public DialogMsg: string = "";
    public DialogType: DialogType;
    public DialogConfirm: boolean; 
    public DialogResult: Subject<boolean>;

    constructor()
    { }

    /**
     * Change mode of this Angular application
     * @param mode 
     */
    public SetMode(mode: AppMode)
    { 
        this.Mode = mode;
        if (mode == AppMode.Main) {
            this.Caption = "Leitstellenverbund Service";
        }
        if (mode == AppMode.Unlogged) {
            this.Caption = "Anmeldung";
            this.MustLogOn = true;
            this.Session.identity = "";
        }
        if (mode == AppMode.Device) {
            this.Caption = "Geräteübersicht";
        }
        if (mode == AppMode.Group) {
            this.Caption = "Benachrichtungsgruppen";
        }
        if (mode == AppMode.Link) {
            this.Caption = "Zuordnungsmatrix";
        }
        if (mode == AppMode.Qualification) {
            this.Caption = "Qualifikationen";
        }
    }

    /**
     * Represents current application mode as a string.
     * Is used in html templates.
     */
    public ModeStr = () => AppMode[this.Mode];

    /**
     * Represents current active modal form as a string.
     * Is used in html templates.
     */
    public ModalFormStr = () => ModalForm[this.Modal];

    /**
     * Shows modal form: for example Edditing devise form
     * Not a confirmation, information or error dialog
     * @param modal - "type" of the form
     */
    public ShowModalForm(modal: ModalForm)
    {
        this.Modal = modal;
        delete(this.ModalResult);
        this.ModalResult = new Subject<boolean>();
    }

    /**
     * Closes modal form: for example Edditing devise form
     * Not a confirmation, information or error dialog
     */
    public CloseModalForm()
    {
        this.Modal = ModalForm.None;
    }

    /**
     * Shows modal dialog (confirmation, infornation or error message)
     * @param type - Error, Warning, Info
     * @param msg  - Message text
     * @param confirm - show or hide Cancel button
     */
    public ShowDialog(type: DialogType, msg: string, confirm: boolean = false)
    {
        this.oldModalForm = this.Modal;
        this.Modal = ModalForm.Dialog;
        this.DialogMsg = msg;
        this.DialogType = type;
        this.DialogConfirm = confirm;
        delete(this.DialogResult);
        this.DialogResult = new Subject<boolean>();
    }

    /**
     * Closes modal dialog
     */
    public CloseDialog()
    {
        this.DialogMsg = "";
        this.Modal = this.oldModalForm;
    }

    /**
     * Refreshes Add, Del and Edit buttons enabling in accordance with number of selected elements
     */
    public ChangeAddDelEditButtonsEnablind(numberOfSelectedItems: number)
    {
        this.AddButtonEnabled = true;
        this.EditButtonEnabled = numberOfSelectedItems == 1;
        this.DelButtonEnabled = numberOfSelectedItems > 0;        
    }
}