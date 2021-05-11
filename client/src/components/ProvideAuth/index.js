import React, {useState} from 'react';
import authContext from '../AuthContext';

function useProvideAuth() {
    return {
        user: null,
        login: ()=>{}, 
        logout: ()=>{}
    };
  }
export function ProvideAuth({ children }) {
    
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
}