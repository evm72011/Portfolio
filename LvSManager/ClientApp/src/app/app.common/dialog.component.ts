import { Component } from '@angular/core';
import { ApplicationService, DialogType } from "./application.service";

/**
 * The component for showing Error, Warning, Info dialogs
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./css/fade-animation.css', './css/dialog.css']
})
export class DialogComponent {

    constructor(
        public application: ApplicationService) { }

    /**
     * Close the dialog and initialize running for assigned to OK and to Cancel buttons operations.
     * @param result - OK or Cancel pressed
     */
    public CloseForm(result: boolean)
    {
        this.application.CloseModalForm();
        this.application.DialogResult.next(result);
    }

    /**
     * Getd name of file for fialog picture
     */
    public GetDialogIco(): string
    {
        var result: string;
        if (this.application.DialogType == DialogType.Info)
            result = "../assets/dlg-info.png";
        else if (this.application.DialogType == DialogType.Warning)
            result = "../assets/dlg-warning.png";
        else
            result = "../assets/dlg-error.png";
        return result;
    }
}
