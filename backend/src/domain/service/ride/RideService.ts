import { confirmRideDTO } from "../../entity/ride/dto/confirmRideDTO";
import { estimateRequestDTO } from "../../entity/ride/dto/estimateRequestDTO";
import { estimateResponseDTO } from "../../entity/ride/dto/estimateResponseDTO";
import { getRideParamsDTO } from "../../entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../entity/ride/dto/getRideResponseDTO";
import { IRideService } from "./IRideService";

export class RideService implements IRideService{
    
    estimate(request: estimateRequestDTO): Promise<estimateResponseDTO> {
        throw new Error("Method not implemented.");
    }
    
    confirm(confirmation: confirmRideDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        throw new Error("Method not implemented.");
    }

}