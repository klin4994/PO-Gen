import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lgD bg-light">
      <a className="navbar-brand" href="/">
        PO Generator
      </a>
      <a className="addProduct" href="/addproduct">
        New Product
      </a>
      <a className="login" href="/login">
        Login
      </a>
    </nav>
  );
}

export default Nav;
