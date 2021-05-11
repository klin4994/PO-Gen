import React,{useState} from "react";
import {   BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation} from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Calculation from "./pages/Calculation";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import { ProvideAuth } from './components/ProvideAuth';
function App() {
  return (
    <ProvideAuth>
        <BrowserRouter>
            <Nav/>
            <Switch>
              <Route exact path= {["/"]}>
                <Calculation/>
              </Route>
              <Route exact path= {["/login"]}> 
                <Login/>
              </Route>
              <PrivateRoute exact path= {["/addproduct"]}> 
                <AddProduct/>
              </PrivateRoute>
              <Route>
                <NoMatch/>
              </Route>
            </Switch>
        </BrowserRouter>
     </ProvideAuth>
  );
}

export default App;
