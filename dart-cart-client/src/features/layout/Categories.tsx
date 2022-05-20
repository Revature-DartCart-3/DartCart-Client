import React from "react";
import { Dropdown } from "react-bootstrap";

const Categories = () => {
  return (
    <Dropdown style={{ flex: "auto" }}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Categories
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Toys</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Clothing</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Furniture</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Entertainment</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Automotive</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Home Goods</Dropdown.Item>
        <Dropdown.Item href="#/action-3">School and Office</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Personal Care</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Categories;
