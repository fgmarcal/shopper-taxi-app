import { DriverReview } from "@prisma/client";
import { createReviewDTO } from "../../../domain/entity/driverReview/dto/createReviewDTO";
import { getReviewDTO } from "../../../domain/entity/driverReview/dto/getReviewDTO";

export interface IDriverReviewRepository {

    create(review:createReviewDTO):Promise<void>;
    getAll():Promise<DriverReview[]>;
    getAllById(id:number):Promise<getReviewDTO[]>;
}