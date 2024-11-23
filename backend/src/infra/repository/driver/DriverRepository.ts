import { Driver } from "@prisma/client";
import { createDriverDto } from "../../../domain/entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../../domain/entity/driver/dto/updateDriverDTO";
import { IDriverRepository } from "./IDriverRepository";
import { prisma } from "../../prisma/Prisma";
import { DriverEntity } from "../../../domain/entity/driver/Driver";

export class DriverRepository implements IDriverRepository {

    async get(id: number): Promise<Driver | null> {
        const driver = await prisma.driver.findUnique({
            where:{
                id
            },
            include:{
                reviews:true
            },
        })
        if(!driver){
            return null;
        }
        return driver
    }

    async getAll(): Promise<DriverEntity[]> {
        const queryResult = await prisma.driver.findMany({
            include:{
                reviews:true
            }
        });
        if(queryResult.length === 0){
            return [] as DriverEntity[]
        }
        
        const drivers:DriverEntity[] = queryResult.map((driver)=>({
            id:driver.id,
            name:driver.name,
            description:driver.description,
            vehicle:driver.vehicle,
            min_km:Number(driver.min_km),
            review:driver.reviews.map((review)=>({
                rating:review.rating,
                comment:review.comment
            })),
            value:Number(driver.value)
        }));

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
        });
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
        });
    }

}