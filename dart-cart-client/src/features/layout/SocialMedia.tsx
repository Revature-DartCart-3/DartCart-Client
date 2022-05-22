import React from "react";
import { Facebook, Twitter, Discord, Pinterest, Github } from "react-bootstrap-icons";

const SocialMedia = () => {
  return (
    <>
      <h6 className="footer-brandname text-uppercase fw-bold mb-4">
        <i className="fa fa-opencart me-3"></i>Dart Cart
      </h6>     
      <div className="footer-icons">
        <ul className="social-icons">
          <li>
            <a className="facebook" href="/" >
              <Facebook size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="twitter" href="/" >
              <Twitter size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="discord" href="/" >
              <Discord size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="pinterest" href="/" >
              <Pinterest size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="github" href="https://github.com/Revature-DartCart" >
              <Github size={30} color="#fff" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SocialMedia;