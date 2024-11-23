import { confirmRideDTO } from "../../entity/ride/dto/confirmRideDTO";
import { getRideParamsDTO } from "../../entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../entity/ride/dto/getRideResponseDTO";
import { IRideService } from "./IRideService";

export class RideService implements IRideService{
    
    confirm(confirmation: confirmRideDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        throw new Error("Method not implemented.");
    }

}