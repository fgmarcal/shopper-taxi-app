import { NextFunction, Request, Response } from "express";
import { IRideService } from "../../../domain/service/ride/IRideService";
import { RideService } from "../../../domain/service/ride/RideService";
import { estimateRequestDTO } from "../../../domain/entity/ride/dto/estimateRequestDTO";

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
            
        } catch (error) {
            next(error);
        }
    }

    getRides = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            
        } catch (error) {
            next(error);
        }
    }
}