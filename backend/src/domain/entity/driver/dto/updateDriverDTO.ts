import { DriverReview, Ride } from "@prisma/client";

export interface updateDriverDto {
    id: number;
    name?: string;
    description?: string;
    vehicle?: string;
    value?: number; 
    min_km?: number; 
    reviews?: DriverReview[]; 
    rides?: Ride[]; 
}