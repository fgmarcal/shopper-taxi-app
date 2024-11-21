import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../entity/customer/dto/createCustomerDTO";
import { iCustomerService } from "./ICustomerService";
import { ICustomerRepository } from "../../../infra/repository/customer/ICustomerRepository";
import { InvalidDataException } from "../../../exceptions/Exceptions";
import { INVALID_DATA } from "../../../exceptions/errorCodes";

export class CustomerService implements iCustomerService{

    private customerRepository:ICustomerRepository

    constructor(customerRepository:ICustomerRepository){
        this.customerRepository = customerRepository;
    }

    async get(email: string): Promise<Customer> {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            throw new InvalidDataException(INVALID_DATA);
        }
        return await this.customerRepository.get(email);
    }

    async create(dto: createCustomerDto): Promise<void> {
        await this.customerRepository.create(dto);
    }

}