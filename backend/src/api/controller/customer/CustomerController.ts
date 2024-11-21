import { NextFunction, Request, Response } from "express";
import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";
import { CustomerService } from "../../../domain/service/customer/CustomerService";
import { createCustomerDto } from "../../../domain/entity/customer/dto/createCustomerDTO";

export class CustomerController {

    async createCustomer(request:Request, response:Response, next:NextFunction){
        //TODO
    }

    async getCustomer(request:Request, response:Response, next:NextFunction){
        const customerRepository = new CustomerRepository();
        const customerService = new CustomerService(customerRepository);

        try {
            const email:string = request.body;
            const customer = await customerService.get(email);
            return response.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }
}