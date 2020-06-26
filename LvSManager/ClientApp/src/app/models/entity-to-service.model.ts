import { CloudUserSession } from "./ServiceCenterConnectControllerPool/cloud-user-session.model";

/**
 * EntityToService must have information about user's session
 */
export interface IEntityToService{
    session: CloudUserSession;
}
/**
 * Analogue for EntityToService<T> class in backend
 * (see more detailed comment in ./ServerApp/Models/EntityToService.cs)
 */
export class EntityToService<T> implements  IEntityToService{
    public session: CloudUserSession;
    public entity: T;
}

/**
 * TypeScript doesn't allow to place EntityToService<T1, T2> and EntityToService<T1, T2, T3> here
 * They must have another name
 * Classes EntityToService<T1, T2> and EntityToService<T1, T2, T3> used rarely in this project
 * So I didn't realise them here, and use these entities as unnamed classes: {session: ..., entity1 ...}
 * Interface IEntityToService allows this.
 */