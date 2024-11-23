import { Driver } from "@prisma/client";
import { createDriverDto } from "../../entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../entity/driver/dto/updateDriverDTO";
import { IDriverService } from "./IDriverService";
import { IDriverRepository } from "../../../infra/repository/driver/IDriverRepository";
import { InvalidDataException, NotFoundException } from "../../../application/exceptions/Exceptions";
import { DRIVER_NOT_FOUND, INVALID_DATA } from "../../../application/exceptions/errorCodes";
import { DriverRepository } from "../../../infra/repository/driver/DriverRepository";

export class DriverService implements IDriverService{

    private driverRepository:IDriverRepository;

    constructor(){
        this.driverRepository = new DriverRepository();
    }

    async get(id: number): Promise<Driver | null> {
        const driver = await this.driverRepository.get(id);
        if(!driver){
            throw new NotFoundException(DRIVER_NOT_FOUND);
        }
        return driver;
    }

    async getAll(): Promise<Driver[]> {
        const drivers = await this.driverRepository.getAll();
        if(drivers.length === 0){
            throw new NotFoundException(DRIVER_NOT_FOUND);
        }
        return drivers;
    }

    async create(dto: createDriverDto): Promise<void> {
        if(!dto.name || !dto.vehicle || !dto.min_km || !dto.value){
            throw new InvalidDataException(INVALID_DATA);
        }
        await this.driverRepository.create(dto);
    }

    async update(id:number, dto: updateDriverDto): Promise<void> {
        const driverExists = await this.driverRepository.get(id);
        if(!driverExists){
            throw new NotFoundException(DRIVER_NOT_FOUND);
        }
        await this.driverRepository.update(id, dto);
    }

}