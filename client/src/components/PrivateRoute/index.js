import React,{useContext} from 'react';
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../AuthContext'



export default function PrivateRoute({ children, ...rest }) {
  const {isAuthenticated} = useContext(AuthContext)
  console.log(isAuthenticated)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
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

  