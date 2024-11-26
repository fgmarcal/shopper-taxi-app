import axios from "axios"
import { estimateRide } from "../../entity/ride/estimateRide"
import { rideRoutes } from "../../routes/endpoints"
import { confirmRide } from "../../entity/ride/confirmRide";
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

    confirm = async(params:confirmRide):Promise<void> =>{
        try{
            await axios.patch(rideRoutes.confirm,params)
        }catch (error) {
            console.error(error);
            throw new Error(JSON.stringify(error))
        }
    }

    get = async() =>{

    }
}