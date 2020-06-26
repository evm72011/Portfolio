export class CloudEditingFieldRemark {
    public customRemarksExisting?: boolean;
    public displayText?: string;
    public propertyName?: string;
    public violation?: number; // enum CloudEditingFieldRemarkViolations

    /**
     * Deletes status information from the text of Validation message
     */
    public ToString(): string
    {
        if (!this.displayText) return "";
        let result = this.displayText;
        result = result.replace("««««« Fehler »»»»»\r\n", "");
        result = result.replace("««««« Warning »»»»»\r\n", "");
        result = result.replace("««««« Hinweis »»»»»\r\n", "");
        result = this.propertyName + ": " + result;
        return result;
    }

    /**
     * Returns Bootstrap's class for validation message
     * Used for html-remarks
     */
    public mapClassValidationMessage(): Object
    {
        return {
            "alert-info":       this.violation == 0,
            "alert-success":    this.violation == 1,
            "alert-warning":    this.violation == 2,
            "alert-danger":     this.violation == 3
        }
    }
}

/*
None = 0, Hint = 1, Warning = 2, Failure = 3,
*/