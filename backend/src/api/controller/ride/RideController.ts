import { NextFunction, Request, Response } from "express";
import { IRideService } from "../../../domain/service/ride/IRideService";
import { RideService } from "../../../domain/service/ride/RideService";
import { estimateRequestDTO } from "../../../domain/entity/ride/dto/estimateRequestDTO";
import { confirmRideDTO } from "../../../domain/entity/ride/dto/confirmRideDTO";
import { getRideParamsDTO } from "../../../domain/entity/ride/dto/getRideParamsDTO";

export class RideController{
    
    private rideService: IRideService;
    constructor(){
        this.rideService = new RideService();
    }

    estimateRide = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const estimation:estimateRequestDTO = request.body;
            const result = await this.rideService.estimate(estimation);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    confirmRide = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const confirmation:confirmRideDTO = request.body;
            await this.rideService.confirm(confirmation);
            response.status(200).json({"success":true});
        } catch (error) {
            next(error);
        }
    }

    getRides = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const customer_id = request.params.customer_id;
            const driver_id = request.query.driver_id ? Number(request.query.driver_id) : undefined;
            const params:getRideParamsDTO = {customer_id, driver_id};
            const result = await this.rideService.get(params);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}