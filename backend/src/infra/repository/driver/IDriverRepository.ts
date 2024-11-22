import { Driver } from "@prisma/client";
import { createDriverDto } from "../../../domain/entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../../domain/entity/driver/dto/updateDriverDTO";

export interface IDriverRepository{

    get(id:string):Promise<Driver>;
    create(dto:createDriverDto):Promise<void>;
    update(dto:updateDriverDto):Promise<void>;
}