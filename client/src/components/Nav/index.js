import React from "react";
import { Menu, Layout } from "antd";
function Nav() {
  return (

    <Menu mode="horizontal" >
      <Menu.Item key="0">
        <a href="/">Generate PO</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/addproduct">Add Product</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/login">Login</a>
      </Menu.Item>
    </Menu>
  );
}

export default Nav;
