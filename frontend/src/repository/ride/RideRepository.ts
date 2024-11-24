import axios from "axios"
import { estimateRide } from "../../entity/ride/estimateRide"
import { rideRoutes } from "../../routes/endpoints"
import { estimateResponse } from "../../entity/ride/estimateResponse";

export class RideRepository{

    estimate = async(params:estimateRide):Promise<estimateResponse> =>{
        try {
            const result = await axios.post(rideRoutes.estimate, params);
            return result.data;
        } catch (error) {
            console.error(error);
            throw new Error(JSON.stringify(error));
        }
    }

    confirm = async() =>{

    }

    get = async() =>{

    }
}