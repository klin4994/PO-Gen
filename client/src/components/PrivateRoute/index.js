import React,{useContext} from 'react';
import {Route, Redirect} from 'react-router-dom'
import authContext from '../AuthContext'



export default function PrivateRoute({ children, ...rest }) {
    function useAuth() {
        return useContext(authContext);
    }
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  