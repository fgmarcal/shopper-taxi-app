import { confirmRideDTO } from "../../../domain/entity/ride/dto/confirmRideDTO";
import { getRideParamsDTO } from "../../../domain/entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../../domain/entity/ride/dto/getRideResponseDTO";
import { prisma } from "../../prisma/Prisma";
import { IRideRepository } from "./IRideRepository";

export class RideRepository implements IRideRepository{

    async confirm(confirmation:confirmRideDTO): Promise<void> {

        await prisma.ride.create({
            data: {
                origin: confirmation.origin,
                createdAt:new Date(),
                destination: confirmation.destination,
                distance: confirmation.distance,
                duration: confirmation.duration,
                value: confirmation.value,
                driverId: confirmation.driver.id,
                customerId: confirmation.customer_id,
            },
        });
    }

    async get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        const { customer_id, driver_id } = params;
    
        const rides = await prisma.ride.findMany({
            where: {
                customerId: customer_id,
                ...(driver_id !== undefined && { driverId: driver_id }),
            },
            include: {
                driver: true, 
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    
        const formattedRides = rides.map((ride) => ({
            id: ride.id,
            date: ride.createdAt,
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            value: ride.value,
            driver: {
                id: ride.driver.id,
                name: ride.driver.name,
            },
        }));
    
        return {
            customer_id: customer_id,
            rides: formattedRides,
        };
    }
    
    

}