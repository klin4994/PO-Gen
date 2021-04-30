import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Calculation from "./pages/Calculation";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
        <Nav/>
        <Switch>
          <Route exact path= {["/"]}>
            <Calculation/>
          </Route>
          <Route exact path= {["/login"]}> 
            <Login/>
          </Route>
          <Route exact path= {["/addproduct"]}> 
            <AddProduct/>
          </Route>
          <Route>
            <NoMatch/>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
