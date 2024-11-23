export interface DriverEntity {
    id:number,
    name:string,
    description:string
    vehicle:string,
    min_km:number,
    review:Review[],
    value:number
}

type Review = {
    rating:number,
    comment:string,
}
