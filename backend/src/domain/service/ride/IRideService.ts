import { IRideRepository } from "../../../infra/repository/ride/IRideRepository";
import { estimateRequestDTO } from "../../entity/ride/dto/estimateRequestDTO";
import { estimateResponseDTO } from "../../entity/ride/dto/estimateResponseDTO";

export interface IRideService extends IRideRepository, IExternalService{}

interface IExternalService {
    estimate(request:estimateRequestDTO):Promise<estimateResponseDTO>;
}

