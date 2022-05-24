import "../styles.css";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Nav from "./NavLinks";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar collapseOnSelect={true} expand="lg" bg="navbar" sticky="top">
        <Container fluid={true} className="header">
          <Logo />
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Searchbar />
            <Nav />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
