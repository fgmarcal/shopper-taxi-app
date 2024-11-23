import { NextFunction, Request, Response } from "express";
import { IDriverRepository } from "../../../infra/repository/driver/IDriverRepository";
import { DriverRepository } from "../../../infra/repository/driver/DriverRepository";
import { IDriverService } from "../../../domain/service/driver/IDriverService";
import { DriverService } from "../../../domain/service/driver/DriverService";
import { createDriverDto } from "../../../domain/entity/driver/dto/createDriverDTO";
import { updateDriverDto } from "../../../domain/entity/driver/dto/updateDriverDTO";

export class DriverController {
    private driverService: IDriverService;

    constructor() {
        const driverRepository: IDriverRepository = new DriverRepository();
        this.driverService = new DriverService(driverRepository);
    }

    getDriver = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const driverId: number = Number(request.params.id);
            const result = await this.driverService.get(driverId);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    getAllDrivers = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const results = await this.driverService.getAll();
            response.status(200).json(results);
        } catch (error) {
            next(error);
        }
    };

    createDriver = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const driverDto: createDriverDto = request.body;
            await this.driverService.create(driverDto);
            response.status(201).json({ success: true });
        } catch (error) {
            next(error);
        }
    };

    updateDriver = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const driverId: number = Number(request.params.id);
            const updateDto: updateDriverDto = request.body;
            await this.driverService.update(driverId, updateDto);
            response.status(201).json({ success: true });
        } catch (error) {
            next(error);
        }
    };
}
