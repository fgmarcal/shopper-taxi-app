import { NextFunction, Request, Response } from "express";
import { IDriverRepository } from "../../../infra/repository/driver/IDriverRepository";
import { DriverRepository } from "../../../infra/repository/driver/DriverRepository";
import { IDriverService } from "../../../domain/service/driver/IDriverService";
import { DriverService } from "../../../domain/service/driver/DriverService";
import { createDriverDto } from "../../../domain/entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../../domain/entity/driver/dto/updateDriverDTO";

export class DriverController {
    
    async getDriver(request:Request, response:Response, next:NextFunction){
        const driverRepository:IDriverRepository = new DriverRepository();
        const driverService:IDriverService = new DriverService(driverRepository);

        try {
            const driverId:number = Number(request.params.id);
            const result = await driverService.get(driverId);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAllDrivers(request:Request, response:Response, next:NextFunction){
        const driverRepository:IDriverRepository = new DriverRepository();
        const driverService:IDriverService = new DriverService(driverRepository);

        try {
            const results = await driverService.getAll();
            response.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }

    async createDriver(request:Request, response:Response, next:NextFunction){
        const driverRepository:IDriverRepository = new DriverRepository();
        const driverService:IDriverService = new DriverService(driverRepository);

        try {
            const driverDto:createDriverDto = request.body;
            await driverService.create(driverDto);
            response.status(201).json({"success":true});
        } catch (error) {
            next(error);
        }
    }

    async updateDriver(request:Request, response:Response, next:NextFunction){
        const driverRepository:IDriverRepository = new DriverRepository();
        const driverService:IDriverService = new DriverService(driverRepository);

        try {
            const driverId:number = Number(request.params.id);
            const updateDto:updateDriverDto = request.body;
            await driverService.update(driverId, updateDto);
            response.status(201).json({"success":true});
        } catch (error) {
            next(error);
        }
    }
}