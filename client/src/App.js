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
import { Menu, Layout } from "antd";
function App() {
  const [isAuthenticated, setIsAuthenticated ] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated };
  const history = useHistory();
  const userLogOut = () => {
    API.logout()
    history.go(0)
  }
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
        <Menu mode="horizontal" >
      <Menu.Item key="0">
        <a href="/">Generate PO</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/addproduct">Add Product</a>
      </Menu.Item>

 
      {isAuthenticated ?
      <Menu.Item key="3"onClick={userLogOut} >
        <a href="#" >Log Out</a>
      </Menu.Item>:
      <Menu.Item key="2">
        <a href="/login">Log In</a>
      </Menu.Item>
      }
    </Menu>
            <Switch>
              <Route exact path= {["/"]}>
              {isAuthenticated ?  
                <Calculation/>:<Login/>} 
              </Route>
              <Route exact path= {["/login"]}> 
                <Login/>
              </Route>
              <Route exact path= {["/addproduct"]} > 
                {isAuthenticated ?  
                <AddProduct/>:<Login/>}
              </Route>
              <Route exact path= {["/logout"]}>
                <AddProduct/>
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
