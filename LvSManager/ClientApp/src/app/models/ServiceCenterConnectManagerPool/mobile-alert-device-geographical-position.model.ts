export class MobileAlertDeviceGeographicalPosition{
    public latitude: number;
    public longitude: number;

    /**
     * Replace "null" fields as "undefined"
     * null throw one exception during JSON parsing at back-end side
     */
    public PrepareForSending()
    {
        this.latitude  = (!this.latitude)  ? undefined : this.latitude;
        this.longitude = (!this.longitude) ? undefined : this.longitude;
    }
}
