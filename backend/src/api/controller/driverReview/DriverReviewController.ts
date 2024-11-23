import { NextFunction, Request, Response } from "express";
import { DriverReviewService } from "../../../domain/service/driverReview/DriverReviewService";
import { IDriverReviewService } from "../../../domain/service/driverReview/IDriverReviewService";
import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";
import { ICustomerRepository } from "../../../infra/repository/customer/ICustomerRepository";
import { DriverRepository } from "../../../infra/repository/driver/DriverRepository";
import { IDriverRepository } from "../../../infra/repository/driver/IDriverRepository";
import { DriverReviewRepository } from "../../../infra/repository/driverReview/DriverReviewRepository";
import { IDriverReviewRepository } from "../../../infra/repository/driverReview/IDriverReviewRepository";
import { createReviewDTO } from "../../../domain/entity/driverReview/dto/createReviewDTO";

export class DriverReviewController{
    private driverReviewService:IDriverReviewService;

    constructor(){
        const customerRepository: ICustomerRepository = new CustomerRepository();
        const driverRepository: IDriverRepository = new DriverRepository();
        const driverReviewRepository: IDriverReviewRepository = new DriverReviewRepository();
        this.driverReviewService = new DriverReviewService(driverReviewRepository, customerRepository, driverRepository);
    }

    createReview = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const review:createReviewDTO = request.body;
            await this.driverReviewService.create(review);
            response.status(201).json({message:"review criada com sucesso"});
        } catch (error) {
            next(error);
        }
    }

    getAllReviews = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const reviews = await this.driverReviewService.getAll();
            response.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    }
}