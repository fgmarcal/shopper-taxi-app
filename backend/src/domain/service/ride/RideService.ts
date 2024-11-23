import { INVALID_DATA, INVALID_DISTANCE, INVALID_DRIVER, NO_RIDES_FOUND } from "../../../application/exceptions/errorCodes";
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
    private driverService: IDriverService;
    private rideRepository: IRideRepository;

    constructor(){
        this.mapsService = new GoogleMapsRouteService();
        this.driverService = new DriverService();
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

        const response = this.createRouteReponse(route)

        return response;
    }
    
    async confirm(confirmation: confirmRideDTO): Promise<void> {
        this.validateRideOriginAndDestination(confirmation.origin, confirmation.destination);
        
        this.validateRideCustomer(confirmation.customer_id);

        await this.validateRideDriverAndDistance(confirmation);

        await this.rideRepository.confirm(confirmation);
    }


    async get(params: getRideParamsDTO): Promise<getRideResponseDTO> {
        this.validateGetCustomer(params);

        await this.validateGetDriver(params);

        const rides = await this.validateRidesExist(params);

        return rides;
    }

    private async findAvailableDrivers(distanceInMeters: number): Promise<DriverEntity[]> {
        const distanceInKm = distanceInMeters / 1000;
    
        const drivers = await this.driverService.getAll();
    
        const filtered = drivers.filter(driver => {
            return (driver.min_km) <= distanceInKm;
        });
    
        filtered.sort((a, b) => {
            const priceA = (a.value) * distanceInKm;
            const priceB = (b.value) * distanceInKm;
            return priceA - priceB;
        }).map((driver) => driver.value = (driver.value * distanceInKm));
    
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

        const startAddressLatitude = leg.start_location.lat;
        const startAddressLongitude = leg.start_location.lng;

        const endAddressLatitude = leg.end_location.lat;
        const endAddressLongitude = leg.end_location.lng;

        const driversOptions:DriverEntity[] = await this.findAvailableDrivers(distance);

        const response:estimateResponseDTO = {
            origin:{
                latitude:startAddressLatitude,
                longitude:startAddressLongitude
            },
            destination:{
                latitude:endAddressLatitude,
                longitude:endAddressLongitude
            },
            distance:distance,
            duration:duration,
            options:driversOptions,
            routeResponse:routeData
        }

        return response
    }

    private validateRideOriginAndDestination(origin:string, destination:string):void{
        if(destination === null || origin === null){
            throw new InvalidDataException(INVALID_DATA);
        }

        if(destination === undefined || origin === undefined){
            throw new InvalidDataException(INVALID_DATA);
        }

        if(destination === origin){
            throw new InvalidDataException(INVALID_DATA);
        }
    }

    private validateRideCustomer(customer_id:string):void{
        if(customer_id === null || customer_id === undefined){
            throw new InvalidDataException(INVALID_DATA);
        }
    }

    private async validateRideDriverAndDistance(confirmation:confirmRideDTO):Promise<void>{
        const driverCheck = await this.driverService.get(confirmation.driver.id);

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
    }

    private validateGetCustomer(params:getRideParamsDTO):void{
        if(params.customer_id === null || params.customer_id === undefined){
            throw new InvalidDataException(INVALID_DATA);
        }
    }

    private async validateGetDriver(params:getRideParamsDTO):Promise<void>{
        if(params.driver_id !== null && params.driver_id !== undefined){
            const checkDriver = await this.driverService.get(params.driver_id);
            if(!checkDriver){
                throw new InvalidDataException(INVALID_DRIVER);
            }
        }
    }

    private async validateRidesExist(params:getRideParamsDTO):Promise<getRideResponseDTO>{
        const rides = await this.rideRepository.get(params);
        if(rides.rides.length === 0){
            throw new NotFoundException(NO_RIDES_FOUND);
        }
        return rides;
    }

}