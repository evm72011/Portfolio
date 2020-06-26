export class MobileAlertDeviceQualification{
    public name?: string; 
    public description?: string;
    public selected: boolean = false;

    /**
     * Represents qualification as a string for an output
     */
    public ToString(): string
    {
        return (!this.description) ? this.name : this.description;
    }
}