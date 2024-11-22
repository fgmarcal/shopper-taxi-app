import { estimateDTO } from "../../../domain/entity/ride/dto/estimateDto";

export interface IRideRepository{

    estimate(data:estimateDTO):Promise<void>;
    confirm():Promise<void>;
    get(params:any):Promise<void>;
}