import { estimateRequestDTO } from "../../entity/ride/dto/estimateRequestDTO";
import { routeServiceResponse } from "../../entity/route/routeServiceResponse";
import { IRoutesService } from "./IRoutesService";
import dotenv from 'dotenv';

dotenv.config();

export class GoogleMapsRouteService implements IRoutesService{

    private API_KEY:string = String(process.env.GOOGLE_API_KEY);
    
    async getRoute(request: estimateRequestDTO): Promise<routeServiceResponse|null> {
        const origin = this.convertAddress(request.origin);
        const destination = this.convertAddress(request.destination);
        
        const GOOGLE_API_URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${this.API_KEY}`;

        try {
            const apiResponse = await fetch(GOOGLE_API_URL);
            const data = await apiResponse.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private convertAddress(address:string): string {
        address = address.replace(" ","+");
        return address;
    }
    
}