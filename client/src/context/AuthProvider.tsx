import React, { createContext, useState } from 'react';
import { UserAuthentication, UserContext } from 'src/model';


export const AuthContext = createContext<UserContext>({
    auth: {},
    setAuth: () => {}
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [auth, setAuth ] = useState<UserAuthentication>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}