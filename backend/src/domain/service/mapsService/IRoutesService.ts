export interface IRoutesService {
    getRoute(request:any):Promise<object|null>;
}