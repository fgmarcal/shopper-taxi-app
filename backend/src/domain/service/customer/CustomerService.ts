import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../entity/customer/dto/createCustomerDTO";
import { ICustomerService } from "./ICustomerService";
import { ICustomerRepository } from "../../../infra/repository/customer/ICustomerRepository";
import { InvalidDataException, NotFoundException } from "../../../application/exceptions/Exceptions";
import { CUSTOMER_NOT_FOUND, INVALID_DATA } from "../../../application/exceptions/errorCodes";
import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";

export class CustomerService implements ICustomerService{

    private customerRepository:ICustomerRepository

    constructor(){
        this.customerRepository = new CustomerRepository();
    }

    async get(email: string): Promise<Customer> {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            throw new InvalidDataException(INVALID_DATA);
        }
        const customer = await this.customerRepository.get(email);
        if(customer == null){
            throw new NotFoundException(CUSTOMER_NOT_FOUND);
        }
        return customer
    }

    async create(dto: createCustomerDto): Promise<void> {
        if(!dto.name || !dto.email){
            throw new InvalidDataException(INVALID_DATA);
        }
        const checkIfExists = await this.customerRepository.get(dto.email);
        if(checkIfExists){
            throw new InvalidDataException(INVALID_DATA); 
        }
        await this.customerRepository.create(dto);
    }

}