import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../common/slices/authSlice";
import { clearCart } from "../../common/slices/cartSlice";
import { RootState } from "../../common/types";

import {Nav, NavDropdown} from 'react-bootstrap'
import { FiShoppingCart } from "react-icons/fi";

const NavLinks = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const user =
    useSelector((state: RootState) => state.authentication.user) || "";

  useEffect(() => {
    if (user) {
      const u = JSON.parse(user);
      setName(u.firstName);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout(null));
    dispatch(clearCart());
    navigate('/');
    window.location.reload();
  };

  return (

    <Nav className="ms-auto middle">
      {user ? (
        <>
          {!props.footer ?
          <>
            <Nav.Link as="span">
              Welcome, {name}!
            </Nav.Link>

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <NavDropdown title="Shops" id="shop-dropdown">
              <NavDropdown.Item as={Link} to="/signup">Create a Shop</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product-register">Register a Product</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shop-product-add">Add Inventory</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Account" id="account-dropdown">
                <NavDropdown.Item as={Link} to="/userprofile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Chat" id="chat-dropdown">
              <NavDropdown.Item as={Link} to="/adminpage">Admin</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/TechChatModal">Support</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/cart" className="cart-icon">
              <FiShoppingCart/>
            </Nav.Link>
          </>
          :
          <>
            <Nav.Link as={Link} to="/" className="text-reset">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/userprofile" className="text-reset">
              Account
            </Nav.Link>

            <Nav.Link as={Link} to="/wishlist" className="text-reset">
              Wishlist
            </Nav.Link>

            <Nav.Link as={Link} to="/" className="text-reset" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </>}
        </>
      ) : (
        <>

          <Nav.Link as={Link} to="/" className={props.footer && "text-reset"}>
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/login" className={props.footer && "text-reset"}>
            Login
          </Nav.Link>

          <Nav.Link as={Link} to="/register" className={props.footer && "text-reset"}>
            Register
          </Nav.Link>
        </>
        
      )}
 
      </Nav> 
);
};

export default NavLinks;
