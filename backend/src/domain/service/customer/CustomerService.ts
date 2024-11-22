import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../entity/customer/dto/createCustomerDTO";
import { iCustomerService } from "./ICustomerService";
import { ICustomerRepository } from "../../../infra/repository/customer/ICustomerRepository";
import { InvalidDataException, NotFoundException } from "../../../exceptions/Exceptions";
import { CUSTOMER_NOT_FOUND, INVALID_DATA } from "../../../exceptions/errorCodes";

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
        const exists = await this.customerRepository.get(email);
        if(exists == null){
            throw new NotFoundException(CUSTOMER_NOT_FOUND);
        }
        return exists
    }

    async create(dto: createCustomerDto): Promise<void> {
        if(!dto.name || !dto.email){
            throw new InvalidDataException(INVALID_DATA);
        }
        await this.customerRepository.create(dto);
    }

}