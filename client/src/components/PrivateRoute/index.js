import React,{useContext} from 'react';
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../AuthContext'



export default function PrivateRoute({ children, ...rest }) {
  const {user} = useContext(AuthContext)
  console.log(user)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
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

  