import React, {useContext} from "react";
import { Menu, Layout} from "antd";
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
  const { Sider } = Layout;

  const navItem ={
    fontWeight: "bold", fontSize:"large"
  }
  return (
    <React.Fragment>

      <Sider
      style={{position:"fixed", zIndex: "1", height: "100vh"}}
      theme="light"
      breakpoint="xl"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Menu>
      <Menu.Item key="0">
        <a style={navItem} href="/">Generate PO</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a style={navItem} href="/addproduct">Add Product</a>
      </Menu.Item>

 
      {isAuthenticated ?
      <Menu.Item key="3"onClick={userLogOut} >
        <a style={navItem} href="#">Log Out</a>
      </Menu.Item>:
      <Menu.Item key="2">
        <a style={navItem} href="/login">Log In</a>
      </Menu.Item>
      }
     
    </Menu>
    </Sider>
    {/* <Menu  style={{padding:"0 20em" }} mode="horizontal"  >
      <Menu.Item key="x">
        
      </Menu.Item>
      <Menu.Item key="0">
        <a style={navItem} href="/">Generate PO</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a style={navItem} href="/addproduct">Add Product</a>
      </Menu.Item>

 
      {isAuthenticated ?
      <Menu.Item key="3"onClick={userLogOut} >
        <a style={navItem} href="#">Log Out</a>
      </Menu.Item>:
      <Menu.Item key="2">
        <a style={navItem} href="/login">Log In</a>
      </Menu.Item>
      }
     
    </Menu> */}

    </React.Fragment>
    
  );
}

export default Nav;
