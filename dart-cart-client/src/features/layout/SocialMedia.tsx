import React from "react";
import { Facebook, Twitter, Linkedin, Pinterest, Github } from "react-bootstrap-icons";
import "./footer.css";

const SocialMedia = () => {
  return (
    <>
      <h6 className="footer-brandname text-uppercase fw-bold mb-4">
        <i className="fa fa-opencart me-3"></i>Dart Cart
      </h6>     
      <div className="footer-icons">
        <ul className="social-icons">
          <li>
            <a className="facebook" href="https://www.facebook.com/" >
              <Facebook size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="twitter" href="https://www.twitter.com/" >
              <Twitter size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="linkedin" href="https://www.linkedin.com/" >
              <Linkedin size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a className="pinterest" href="https://www.pinterest.com/" >
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