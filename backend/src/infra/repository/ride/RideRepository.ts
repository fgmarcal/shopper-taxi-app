import { confirmRideDTO } from "../../../domain/entity/ride/dto/confirmRideDTO";
import { getRideParamsDTO } from "../../../domain/entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../../domain/entity/ride/dto/getRideResponseDTO";
import { IRideRepository } from "./IRideRepository";

export class RideRepository implements IRideRepository{

    confirm(confirmation:confirmRideDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        throw new Error("Method not implemented.");
    }

}