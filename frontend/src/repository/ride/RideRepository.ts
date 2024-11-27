import axios from "axios"
import { estimateRide } from "../../entity/ride/estimateRide"
import { rideRoutes } from "../../routes/endpoints"
import { confirmRide } from "../../entity/ride/confirmRide";
import { estimateResponse } from "../../entity/ride/estimateResponse";
import { getRides } from "../../entity/ride/getRides";
import { getRideResponse } from "../../entity/ride/getRidesResponse";

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

    get = async(params:getRides):Promise<getRideResponse> =>{
        const driverQuery = params.driver_id !== undefined ? `?driver_id=${encodeURIComponent(params.driver_id)}` : '';
        const fullQuery = `${encodeURIComponent(params.customer_id)}`;
        try {
            const result = await axios.get(rideRoutes.getByCustomer+fullQuery+driverQuery);
            return result.data;
        } catch (error) {
            console.error(error);
            throw new Error(JSON.stringify(error))
        }
    }
}