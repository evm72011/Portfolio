export class CloudColor{
    public red: number   = 0;
    public green: number = 0;
    public blue: number  = 0;
    public opacity: number = 0;

    /**
     * Creates an instance of CloudColor from a hex-representation
     * @param hex 
     */
    constructor (hex: string = null)
    {
        if ((!hex) || (hex.length != 7) || (hex[0] != "#")) return;
        let r = parseInt(hex.substr(1, 2), 16);
        let g = parseInt(hex.substr(3, 2), 16);
        let b = parseInt(hex.substr(5, 2), 16);
        if (!r || !g || !b) return;
        this.red   = r;
        this.green = g;
        this.blue  = b;
    }
}