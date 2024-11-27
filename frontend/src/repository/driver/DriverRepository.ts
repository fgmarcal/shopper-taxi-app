import axios from "axios"
import { driverRoutes } from "../../routes/endpoints"
import { Driver } from "../../entity/driver/driver";

export class DriverRepository{

    getAll = async ():Promise<Driver[]> =>{
        try {
            const drivers = await axios.get(driverRoutes.getAll);
            return drivers.data;
        } catch (error) {
            console.error(error);
            throw new Error(JSON.stringify(error));
        }
    }
}