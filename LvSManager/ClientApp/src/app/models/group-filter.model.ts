/**
 * Contains information about filtering conditions for spread groups
 */
export class GroupFilter{
    public name: string = "";

    /**
     * Clears the filter
     */
    public Clear()
    {
        this.name = "";
    }
}