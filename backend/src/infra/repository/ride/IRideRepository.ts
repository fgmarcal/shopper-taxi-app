import { confirmRideDTO } from "../../../domain/entity/ride/dto/confirmRideDTO";
import { getRideParamsDTO } from "../../../domain/entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../../domain/entity/ride/dto/getRideResponseDTO";

export interface IRideRepository{
    confirm(confirmation:confirmRideDTO):Promise<void>;
    get(params:getRideParamsDTO):Promise<getRideResponseDTO>;
}
