export interface getRideResponseDTO {
    customer_id:string,
    rides:Ride[]
}

type Ride = {
    id:number,
    date:Date,
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