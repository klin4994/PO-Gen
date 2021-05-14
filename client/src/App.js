import React,{useState, useContext, useEffect} from "react";
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
import AuthContext from './components/AuthContext';
import API from './utils/API';
function App() {
  const [isAuthenticated, setIsAuthenticated ] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated };

  // We check if user is already logged in, and if they are then we set isAuthenticated to true
  useEffect(() => {
    API.userLoggedIn().then(response => {
      console.log(response)
      setIsAuthenticated(response.data.isAuthenticated)
    })
  }, []);


  return (
    <AuthContext.Provider value={value}>
        <BrowserRouter>
            <Nav/>
            <Switch>
              <Route exact path= {["/"]}>
                <Calculation/>
              </Route>
              <Route exact path= {["/login"]}> 
                <Login/>
              </Route>
              <Route exact path= {["/addproduct"]} > 
                {isAuthenticated ?  
                <AddProduct/>:<Login/>}
              </Route>
              <Route>
                <NoMatch/>
              </Route>
            </Switch>
        </BrowserRouter>
     </AuthContext.Provider>
  );
}

export default App;
