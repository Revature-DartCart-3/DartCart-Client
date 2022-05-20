import React from "react";
import logo from "../../imgs/Brand.png";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const logoStyle = {
  height: "15%",
  width: "15%",
  marginLeft: "3%",
};

const Logo = () => {
  return (
    <>
      <Navbar>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h2>DartCart</h2>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div style={{ textAlign: "left" }}>
            <img
              className="logo-img"
              style={logoStyle}
              src={logo}
              alt="logo"
            ></img>
          </div>
        </Link>
      </Navbar>
    </>
  );
};

export default Logo;
