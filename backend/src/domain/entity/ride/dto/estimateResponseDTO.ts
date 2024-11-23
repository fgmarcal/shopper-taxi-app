export interface estimateResponseDTO{
    origin:LatLong,
    destination:LatLong,
    distance:number,
    duration:string,
    options:DriverOption[],
    routeResponse:object

}

type LatLong = {
    latitude:number,
    longitude:number
}

export type DriverOption = {
    id:number,
    name:string,
    description:string
    vehicle:string,
    review:Review[],
    value:number
}

type Review = {
    rating:number,
    comment:string
}

