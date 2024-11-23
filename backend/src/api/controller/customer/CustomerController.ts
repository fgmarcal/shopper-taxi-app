import { NextFunction, Request, Response } from "express";
import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";
import { CustomerService } from "../../../domain/service/customer/CustomerService";
import { createCustomerDto } from "../../../domain/entity/customer/dto/createCustomerDTO";

export class CustomerController {
    private customerService: CustomerService;

    constructor() {
        const customerRepository = new CustomerRepository();
        this.customerService = new CustomerService(customerRepository);
    }

    createCustomer = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const customer: createCustomerDto = request.body;
            await this.customerService.create(customer);
            response.status(201).json({ success: true });
        } catch (error) {
            next(error);
        }
    };

    getCustomer = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const email: string = request.params.email;
            const customer = await this.customerService.get(email);
            response.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    };
}