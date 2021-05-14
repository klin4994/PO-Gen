import React, {useContext} from "react";
import { Menu, Layout } from "antd";
import AuthContext from "../AuthContext";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
function Nav() {
  const history = useHistory();
  const {isAuthenticated} = useContext(AuthContext)
  const userLogOut = () => {
    API.logout()
    history.go(0)
  }
  return (

    <Menu mode="horizontal" >
      <Menu.Item key="0">
        <a href="/">Generate PO</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/addproduct">Add Product</a>
      </Menu.Item>

 
      {isAuthenticated ?
      <Menu.Item key="3"onClick={userLogOut} >
        <a href="#">Log Out</a>
      </Menu.Item>:
      <Menu.Item key="2">
        <a href="/login">Log In</a>
      </Menu.Item>
      }
    </Menu>
  );
}

export default Nav;
