import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../entity/customer/dto/createCustomerDTO";
import { iCustomerService } from "./ICustomerService";
import { ICustomerRepository } from "../../../infra/repository/customer/ICustomerRepository";

export class CustomerService implements iCustomerService{

    private customerRepository:ICustomerRepository

    constructor(customerRepository:ICustomerRepository){
        this.customerRepository = customerRepository;
    }

    async get(email: string): Promise<Customer | null> {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailRegex.test(email)){
            return await this.customerRepository.get(email);
        }
        throw Error;
    }

    async create(dto: createCustomerDto): Promise<void> {
        await this.customerRepository.create(dto);
    }

}