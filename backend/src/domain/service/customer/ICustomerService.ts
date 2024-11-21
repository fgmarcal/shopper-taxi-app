import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../entity/customer/dto/createCustomerDTO";

export interface iCustomerService{

    get(email:string): Promise<Customer>;
    create(dto: createCustomerDto): Promise<void>;
}