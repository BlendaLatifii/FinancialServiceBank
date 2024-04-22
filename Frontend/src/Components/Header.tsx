import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
function Header(){

    return(
         <>
           <header id="header" className="header d-flex align-items-center">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
              <a href="index.html" className="logo d-flex align-items-center">
                <h1>Financial Sevice Bank<span>.</span></h1>
              </a>
              <nav id="navbar" className="navbar">
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Services">Services</Link></li>
                <li><Link to="/AboutUs">About Us</Link></li>
                <li><Link to="/ContactUs">Contact Us</Link></li>
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/Login">Login</Link></li>
                </ul>
              </nav>
              <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
              <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
            </div>
          </header>
         </>
    );
}
export default Header;