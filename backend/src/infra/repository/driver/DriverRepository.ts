import { Driver } from "@prisma/client";
import { createDriverDto } from "../../../domain/entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../../domain/entity/driver/dto/updateDriverDTO";
import { IDriverRepository } from "./IDriverRepository";
import { prisma } from "../../prisma/Prisma";

export class DriverRepository implements IDriverRepository {

    async get(id: number): Promise<Driver | null> {
        const driver = await prisma.driver.findUnique({
            where:{
                id
            }
        })
        if(!driver){
            return null;
        }
        return driver
    }

    async getAll(): Promise<Driver[]> {
        const drivers = await prisma.driver.findMany();
        if(drivers.length === 0){
            return [] as Driver[]
        }
        return drivers;
    }

    async create(dto: createDriverDto): Promise<void> {
        await prisma.driver.create({
            data:{
                name:dto.name,
                description:dto.description,
                min_km:dto.min_km,
                value:dto.value,
                vehicle:dto.vehicle
            }
        })
    }

    async update(id:number, dto: updateDriverDto): Promise<void> {
        await prisma.driver.update({
            where:{
                id:id
            },
            data:{
                description:dto.description,
                min_km:dto.min_km,
                name:dto.name,
                value:dto.value,
                vehicle:dto.vehicle                
            }
        })
    }

}