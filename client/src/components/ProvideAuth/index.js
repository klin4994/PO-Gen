import React, {useState} from 'react';
import AuthContext from '../AuthContext';


export function ProvideAuth({ children }) {
    const state = {
        IsAuthenticated:false,
        setIsAuthenticated:()=>{}
    };
    return (
      <AuthContext.Provider value= {state}>
        {children}
      </AuthContext.Provider>
    );
}