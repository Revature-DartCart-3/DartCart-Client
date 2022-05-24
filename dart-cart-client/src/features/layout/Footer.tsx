import Navbar from "./NavLinks";
import About from "./About";
import SocialMedia from "./SocialMedia";
import UsefulLinks from "./UsefulLinks";
import "./footer.css"

export default function Footer() {
  // divs dealing with managing columns were not abstracted away so this area can focus on applying styles correctly

  return (
    <footer className="site-footer text-center text-lg-start" id="footerFix">
      <section className="footer-info" id="footerFix">
        <div className="container text-center text-md-start mt-5" id="footerFix">
          <div className="row mt-3" id="footerFix">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4" id="footerFix">
              <SocialMedia />
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4" id="footerFix">
              <h6 className="text-uppercase fw-bold mb-4" id="footerFix">Navigation</h6>
              <Navbar footer="true" />
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4" id="footerFix">
              <h6 className="text-uppercase fw-bold mb-4" id="footerFix">Useful links</h6>
              <UsefulLinks />
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4" id="footerFix">
              <About />
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
      <div className="copyright-text text-muted text-center p-4">
        © 2022 Dart Cart
      </div>
    </footer>
  );
}
