import { Link } from "react-router-dom";
import './Footer.css';
function Footer(){
     return (
        <>
          <footer id="footer" className="footer">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-5 col-md-12 footer-info">
                  <a href="index.html" className="logo d-flex align-items-center">
                    <span>Bank</span>
                  </a>
                  <p>"Your trusted partner in financial growth and security."</p>
                  <div className="social-links d-flex mt-4">
                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
    
                <div className="col-lg-2 col-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                  <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/services">Services</Link></li>

                  </ul>
                </div>
    
                <div className="col-lg-2 col-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><a href="#">Loans</a></li>
                    <li><a href="#">Transaction</a></li>
                    <li><a href="#">Bank Accountt</a></li>
                  </ul>
                </div>
    
                <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                  <h4>Contact Us</h4>
                  <p>
                    A108 Adam Street <br />
                    New York, NY 535022<br />
                    United States <br /><br />
                    <strong>Phone:</strong> +1 5589 55488 55<br />
                    <strong>Email:</strong> info@example.com<br />
                  </p>
                </div>
              </div>
            </div>
    
            <div className="container mt-4">
              <div className="copyright">
                &copy; Copyright <strong><span>Financial Service Bank</span></strong>. All Rights Reserved
              </div>
            </div>
          </footer></>
     );
}
export default Footer;