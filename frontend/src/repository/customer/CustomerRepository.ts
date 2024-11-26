import axios from "axios"
import { Customer } from "../../entity/customer/createCustomer"
import { customerRoutes } from "../../routes/endpoints"
import { createCustomerResponse } from "../../entity/customer/createCustomerResponse";

export class CustomerRepository{

    create = async (customer:Customer):Promise<createCustomerResponse> =>{
        try {
            const creation = await axios.post(customerRoutes.create,customer);
            return creation.data;
        } catch (error) {
            console.error(error);
            throw new Error(JSON.stringify(error));
        }
    }

    get = async (email:string):Promise<Customer> => {
        try{
            const customer = await axios.get(customerRoutes.get+email);
            return customer.data;
        }catch(error){
            console.error(error);
            throw new Error(JSON.stringify(error));
        }

    }
}