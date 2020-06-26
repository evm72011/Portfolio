export class MobileAlertDeviceSpreadGroup{
    public description?: string;
    public identity?: string;
    public name?: string;

    /**
     * Compares spread group with other ones
     * @param x group to compare
     */
    public equal(x: MobileAlertDeviceSpreadGroup): boolean
    {
        if ((!x) || (!this.identity)) return false;
        return this.identity == x.identity;
    }
}