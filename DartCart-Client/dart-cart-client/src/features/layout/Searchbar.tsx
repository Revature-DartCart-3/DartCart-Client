import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopProducts,
  getSearchString,
  updatedSearchString,
} from "../../common/slices/shopProductSlice";
import { useNavigate } from "react-router-dom";

import "../authentication/protect_btn.css";

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
    <div className="navbar-brand" style={{ width: " 60%", marginLeft: "20px" }}>
      <div className="form-inline my-2 my-lg-0">
        <button
          onClick={(e) => handleSearch(e)}
          id="protect_btn"
          className="btn btn-success"
          value="Search"
          style={{ float: "right", backgroundColor: "#198754" }}
        >
          Search{" "}
        </button>
        <div style={{ overflow: "hidden", paddingRight: ".5em" }}>
          <input
            type="text"
            placeholder="Search"
            style={{ width: "100%" }}
            ref={string}
            onKeyUp={(e) => {
              // Check if keypress is enter button
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
            onBlur={(e) => handleSearch(e)}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
