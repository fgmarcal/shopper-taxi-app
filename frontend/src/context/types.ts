import { Dispatch, SetStateAction } from "react";

export interface IChildren {
    children: React.ReactNode;
}

export interface AppContextType {
    signed:boolean;
    customerId:string;
    originContext:string;
    destinationContext:string;
    customerName:string;
    setSigned: Dispatch<SetStateAction<boolean>>;
    setCustomerId: Dispatch<SetStateAction<string>>;
    setOriginContext:Dispatch<SetStateAction<string>>;
    setDestinationContext:Dispatch<SetStateAction<string>>;
    setCustomerName:Dispatch<SetStateAction<string>>;


}
