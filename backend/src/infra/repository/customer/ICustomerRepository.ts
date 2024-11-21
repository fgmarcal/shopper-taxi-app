import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../../domain/entity/customer/dto/createCustomerDTO";

export interface ICustomerRepository{

    get(email:string): Promise<Customer>;
    create(dto: createCustomerDto): Promise<void>;
}