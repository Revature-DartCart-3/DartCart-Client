import "../styles.css";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Nav from "./Navbar";
import { Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar>
      <header
        className="navbar navbar-expand-lg navbar-fixed-top navbar-custom"
        style={{ width: "100%" }}
      >
        <Logo />
        <Searchbar />
        <Nav />
      </header>
    </Navbar>
  );
};

export default Header;
