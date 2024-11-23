import { confirmRideDTO } from "../../../domain/entity/ride/dto/confirmRideDTO";
import { getRideParamsDTO } from "../../../domain/entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../../domain/entity/ride/dto/getRideResponseDTO";
import { prisma } from "../../prisma/Prisma";
import { IRideRepository } from "./IRideRepository";

export class RideRepository implements IRideRepository{

    async confirm(confirmation:confirmRideDTO): Promise<void> {
        await prisma.ride.create({
            data:{
                origin:confirmation.origin,
                destination:confirmation.destination,
                distance:confirmation.distance,
                
            }
        })
        throw new Error("Method not implemented.");
    }

    async get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        throw new Error("Method not implemented.");
    }

}