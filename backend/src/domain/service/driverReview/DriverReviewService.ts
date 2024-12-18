import { DriverReview } from "@prisma/client";
import { CUSTOMER_NOT_FOUND, DRIVER_NOT_FOUND, INVALID_DATA } from "../../../application/exceptions/errorCodes";
import { InvalidDataException, NotFoundException } from "../../../application/exceptions/Exceptions";
import { ICustomerRepository } from "../../../infra/repository/customer/ICustomerRepository";
import { IDriverRepository } from "../../../infra/repository/driver/IDriverRepository";
import { IDriverReviewRepository } from "../../../infra/repository/driverReview/IDriverReviewRepository";
import { createReviewDTO } from "../../entity/driverReview/dto/createReviewDTO";
import { getReviewDTO } from "../../entity/driverReview/dto/getReviewDTO";
import { IDriverReviewService } from "./IDriverReviewService";
import { DriverReviewRepository } from "../../../infra/repository/driverReview/DriverReviewRepository";
import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";
import { DriverRepository } from "../../../infra/repository/driver/DriverRepository";

export class DriverReviewService implements IDriverReviewService{

    private driverReviewRepository:IDriverReviewRepository;
    private driverRepository:IDriverRepository;
    private customerRepository:ICustomerRepository;

    constructor(){

        this.driverReviewRepository = new DriverReviewRepository();
        this.customerRepository = new CustomerRepository();
        this.driverRepository = new DriverRepository();
    }

    async create(review: createReviewDTO): Promise<void> {
        const findCustomer = await this.customerRepository.get(review.customerId);
        if(!findCustomer){
            throw new NotFoundException(CUSTOMER_NOT_FOUND);
        }

        const findDriver = await this.driverRepository.get(review.driverId);
        if(!findDriver){
            throw new NotFoundException(DRIVER_NOT_FOUND);
        }

        if(!review.rating || review.rating > 5 || review.rating < 0){
            throw new InvalidDataException(INVALID_DATA);
        }
        
        await this.driverReviewRepository.create(review);
    }

    async getAll(): Promise<DriverReview[]> {
        return await this.driverReviewRepository.getAll();
    }

    async getAllById(id: number): Promise<getReviewDTO[]> {
        if(!id){
            throw new InvalidDataException(INVALID_DATA);
        }
        return await this.driverReviewRepository.getAllById(id);
    }

}