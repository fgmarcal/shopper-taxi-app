import { Customer } from "@prisma/client";
import { createCustomerDto } from "../../../domain/entity/customer/dto/createCustomerDTO";
import { ICustomerRepository } from "./ICustomerRepository";
import { prisma } from "../../prisma/Prisma";

export class CustomerRepository implements ICustomerRepository{

    async get(email: string): Promise<Customer | null> {
        const customer = await prisma.customer.findUnique({
            where:{
                email
            }
        })
        if(!customer){
            return null;
        }
        return customer;
    }
    
    async create(dto: createCustomerDto): Promise<void> {
        await prisma.customer.create({
            data:{
                name:dto.name,
                email:dto.email
            }
        })
    }

}