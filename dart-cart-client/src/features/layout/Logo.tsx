import logo from "../../imgs/Brand.png";
import { Link } from "react-router-dom";
import { NavbarBrand } from "react-bootstrap";
import './navbar.css';

const Logo = () => {
  return (
    <>
      <NavbarBrand as={Link} to="/" className="logo-title">
        DartCart
        <img
          className="logo"
          src={logo}
          alt="dart cart logo"
        />
      </NavbarBrand>
    </>
  );
};

export default Logo;
