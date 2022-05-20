import React from "react";
import "./footer.css";

const SocialMedia = () => {
  return (
    <>
      <h6 className="text-uppercase fw-bold mb-4" id="footerFix">
        <i className="fa fa-opencart me-3" id="footerFix"></i>Dart Cart
      </h6>
      <a href="http://www.facebook.com" target="no_blank" className="fa fa-facebook-square" id="footerFix"></a>
      <a href="http://www.twitter.com" target="no_blank" className="fa fa-twitter-square" id="footerFix"></a>
      <a href="http://www.linkedin.com" target="no_blank" className="fa fa-linkedin-square" id="footerFix"></a>
      <a href="http://www.pinterest.com" target="no_blank" className="fa fa-pinterest-square" id="footerFix"></a>
      <a href="https://github.com/Revature-DartCart" target="no_blank" className="fa fa-github" id="footerFix"></a>

    </>
  );
};

export default SocialMedia;