export interface confirmRideDTO {
    customer_id:string,
    origin:string,
    destination:string,
    distance:number,
    duration:string,
    driver:Driver,
    value:number
}

type Driver = {
    id:number,
    name:string
}