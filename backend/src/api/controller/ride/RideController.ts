import { NextFunction, Request, Response } from "express";
import { IRideService } from "../../../domain/service/ride/IRideService";
import { RideService } from "../../../domain/service/ride/RideService";

export class RideController{
    
    private rideService: IRideService;
    constructor(){
        this.rideService = new RideService();
    }

    estimateRide = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            
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