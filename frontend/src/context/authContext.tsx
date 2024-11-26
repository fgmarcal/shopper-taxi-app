import React, { createContext, useState } from 'react';
import { SignedContext, IChildren } from './types';


const AuthContext = createContext<SignedContext>({} as SignedContext);

export const AuthProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [signed, setSigned] = useState<boolean>(false);

    return (
    
    <AuthContext.Provider value={{ signed, setSigned}}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthContext;