import React, { createContext, useState } from 'react';
import { AppContextType, IChildren } from './types';


const AppContext = createContext<AppContextType>({} as AppContextType);

export const ContextProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [signed, setSigned] = useState<boolean>(false);
    const [customerId, setCustomerId] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>('');
    const [originContext, setOriginContext] = useState<string>('');
    const [destinationContext, setDestinationContext] = useState<string>('');

    return (
    
    <AppContext.Provider value={{ 
        signed,setSigned,
        customerId,setCustomerId,
        originContext, setOriginContext,
        destinationContext, setDestinationContext,
        customerName, setCustomerName
        }}>
        {children}
    </AppContext.Provider>
    );
};

export default AppContext;