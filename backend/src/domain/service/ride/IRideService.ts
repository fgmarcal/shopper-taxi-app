import { IRideRepository } from "../../../infra/repository/ride/IRideRepository";
import { confirmRideDTO } from "../../entity/ride/dto/confirmRideDTO";
import { estimateRequestDTO } from "../../entity/ride/dto/estimateRequestDTO";
import { estimateResponseDTO } from "../../entity/ride/dto/estimateResponseDTO";
import { getRideParamsDTO } from "../../entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../entity/ride/dto/getRideResponseDTO";

export interface IRideService {
    estimate(request:estimateRequestDTO):Promise<estimateResponseDTO>;
    confirm(confirmation:confirmRideDTO):Promise<void>;
    get(params:getRideParamsDTO):Promise<getRideResponseDTO>;
}