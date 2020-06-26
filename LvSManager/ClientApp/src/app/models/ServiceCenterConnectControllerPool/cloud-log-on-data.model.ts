export class CloudLogOnData {
    public clientIdentity?: string;
    public sessionLifetimeInMinutes?: number = 10;
    public userLogOnName?: string;
    public userPassword?: string = "";

    /**
     * Clears CloudLogOnData information after logging off
     */
    public Clear()
    {
        this.clientIdentity = "";
        this.userLogOnName = "";
        this.userPassword = "";
    }
}