import { Driver } from "@prisma/client";
import { createDriverDto } from "../../../domain/entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../../domain/entity/driver/dto/updateDriverDTO";
import { DriverEntity } from "../../../domain/entity/driver/Driver";

export interface IDriverRepository{

    get(id:number):Promise<Driver|null>;
    getAll():Promise<DriverEntity[]>;
    create(dto:createDriverDto):Promise<void>;
    update(id:number, dto:updateDriverDto):Promise<void>;
}