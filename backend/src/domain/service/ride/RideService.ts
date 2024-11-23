import { INVALID_DATA, INVALID_DISTANCE, INVALID_DRIVER } from "../../../application/exceptions/errorCodes";
import { InvalidDataException, NotFoundException } from "../../../application/exceptions/Exceptions";
import { IRideRepository } from "../../../infra/repository/ride/IRideRepository";
import { RideRepository } from "../../../infra/repository/ride/RideRepository";
import { DriverEntity } from "../../entity/driver/Driver";
import { confirmRideDTO } from "../../entity/ride/dto/confirmRideDTO";
import { estimateRequestDTO } from "../../entity/ride/dto/estimateRequestDTO";
import { estimateResponseDTO } from "../../entity/ride/dto/estimateResponseDTO";
import { getRideParamsDTO } from "../../entity/ride/dto/getRideParamsDTO";
import { getRideResponseDTO } from "../../entity/ride/dto/getRideResponseDTO";
import { routeServiceResponse } from "../../entity/route/routeServiceResponse";
import { DriverService } from "../driver/DriverService";
import { IDriverService } from "../driver/IDriverService";
import { GoogleMapsRouteService } from "../mapsService/GoogleMapsRouteService";
import { IRoutesService } from "../mapsService/IRoutesService";
import { IRideService } from "./IRideService";

export class RideService implements IRideService{

    private mapsService: IRoutesService;
    private driversService: IDriverService;
    private rideRepository: IRideRepository;

    constructor(){
        this.mapsService = new GoogleMapsRouteService();
        this.driversService = new DriverService();
        this.rideRepository = new RideRepository();
    }

    async estimate(request: estimateRequestDTO): Promise<estimateResponseDTO> {
        if(request.origin === null || request.destination === null || request.customer_id === null){
            throw new InvalidDataException(INVALID_DATA);
        }

        if(request.destination === request.origin){
            throw new InvalidDataException(INVALID_DATA)
        }

        const route = await this.mapsService.getRoute(request) as routeServiceResponse;

        return this.createRouteReponse(route);
    }
    
    async confirm(confirmation: confirmRideDTO): Promise<void> {
        if(confirmation.destination === null || confirmation.origin === null){
            throw new InvalidDataException(INVALID_DATA);
        }
        if(confirmation.customer_id === null){
            throw new InvalidDataException(INVALID_DATA);
        }

        if(confirmation.destination === confirmation.origin){
            throw new InvalidDataException(INVALID_DATA);
        }

        const driverCheck = await this.driversService.get(confirmation.driver.id);
        
        if(!driverCheck){
            throw new InvalidDataException(INVALID_DRIVER);
        }

        if(driverCheck.name !== confirmation.driver.name){
            throw new InvalidDataException(INVALID_DRIVER);
        }

        const realDistance = confirmation.distance/1000;
        if(realDistance < Number(driverCheck?.min_km)){
            throw new InvalidDataException(INVALID_DISTANCE);
        }

        if(confirmation.value !== (realDistance*driverCheck.value)){
            throw new InvalidDataException(INVALID_DATA);
        }

        await this.rideRepository.confirm(confirmation);
    }


    //TODO
    async get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        throw new Error("Method not implemented.");
    }

    private async findAvailableDrivers(distanceInMeters: number): Promise<DriverEntity[]> {
        const distance_km = distanceInMeters / 1000;
    
        const drivers = await this.driversService.getAll();
    
        const filtered = drivers.filter(driver => {
            return Number(driver.min_km) <= distance_km;
        });
    
        filtered.sort((a, b) => {
            const priceA = Number(a.value) * distance_km;
            const priceB = Number(b.value) * distance_km;
            return priceA - priceB;
        }).map((driver) => driver.value = (driver.value * distance_km));
    
        return filtered;
    }

    private async createRouteReponse(route:routeServiceResponse):Promise<estimateResponseDTO> {
        if (!route || (route as routeServiceResponse).status !== "OK" || (route as routeServiceResponse).routes.length === 0) {
            throw new InvalidDataException(INVALID_DATA);
        }

        const routeData = route as routeServiceResponse;
        const selectedRoute = routeData.routes[0];
        const leg = selectedRoute.legs[0];

        if (!leg) {
            throw new InvalidDataException(INVALID_DATA);
        }

        const distance = leg.distance.value;
        const duration = leg.duration.text;

        const startAddressLat = leg.start_location.lat;
        const startAddressLong = leg.start_location.lng;

        const endAddressLat = leg.end_location.lat;
        const endAddressLong = leg.end_location.lng;

        const options:DriverEntity[] = await this.findAvailableDrivers(distance);

        const response:estimateResponseDTO = {
            origin:{
                latitude:startAddressLat,
                longitude:startAddressLong
            },
            destination:{
                latitude:endAddressLat,
                longitude:endAddressLong
            },
            distance:distance,
            duration:duration,
            options:options,
            routeResponse:routeData
        }

        return response
    }

}