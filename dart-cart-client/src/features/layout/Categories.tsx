import React from "react";
import { Navbar } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const Categories = () => {
  return (
    <Dropdown style={{ flex: "auto"}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Categories
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Categories;