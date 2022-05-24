import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopProducts,
  getSearchString,
  updatedSearchString,
} from "../../common/slices/shopProductSlice";
import { useNavigate } from "react-router-dom";

import { Form, Button, FloatingLabel } from "react-bootstrap";
import {FcSearch } from "react-icons/fc";
import "../authentication/protect_btn.css";
import "./layoutStyle.css";


const Searchbar = () => {
  const dispatch = useDispatch();
  const string = useRef<HTMLInputElement>(null);
  const search: string = useSelector(getSearchString);

  const nav = useNavigate();
  const handleSearch = (e: any) => {
    dispatch(fetchShopProducts(search));
    nav("/display");
  };

  const onChangeHandler = (e: any) => {
    dispatch(updatedSearchString(string.current?.value));
  };

  return (
    <>
      <div className="navbar-brand ms-auto" style={{ width: "40%" }}>
        <div className="form-inline d-flex my-2 my-lg-0">

          <div className="searchForm">
            <FloatingLabel controlId="floatingInput" label="Search" className="floatingInput">
              <Form.Control type="text" className="formControl" placeholder="Search" ref={string} onKeyUp={(e) => {
                //check if key press is the enter button
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
                onBlur={(e) => handleSearch(e)}
                onChange={(e) => {
                  onChangeHandler(e);
              }} />
            </FloatingLabel>
          </div>
          <Button variant="success" onClick={(e) => handleSearch(e)} id="search-btn" className="searchBtn" value="Search" >
            <FcSearch size={30} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
