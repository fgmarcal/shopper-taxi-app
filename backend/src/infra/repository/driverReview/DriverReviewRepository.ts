import { DriverReview } from "@prisma/client";
import { createReviewDTO } from "../../../domain/entity/driverReview/dto/createReviewDTO";
import { IDriverReviewRepository } from "./IDriverReviewRepository";
import { prisma } from "../../prisma/Prisma";
import { getReviewDTO } from "../../../domain/entity/driverReview/dto/getReviewDTO";

export class DriverReviewRepository implements IDriverReviewRepository{

    async create(review: createReviewDTO): Promise<void> {
        await prisma.driverReview.create({
            data:{
                comment:review.comment,
                customerId:review.customerId,
                driverId:review.driverId,
                rating:review.rating
            }
        })
    }

    async getAll(): Promise<getReviewDTO[]> {
        const fullReviews:DriverReview[] = await prisma.driverReview.findMany();
        const simpleReviews:getReviewDTO[] = fullReviews.map((review) => ({
            comment:review.comment,
            rating:review.rating
        }));

        if(!fullReviews){
            return []
        }

        return simpleReviews;
    }

}