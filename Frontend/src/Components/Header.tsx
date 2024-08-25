import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import { AuthService } from "../services/AuthService";
import { useEffect } from "react";
function Header(){

  useEffect(() => {
    const handleMobileNavToggle = () => {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navbar = document.querySelector('#navbar');
        
        if (mobileNavToggle && navbar) {
            mobileNavToggle.addEventListener('click', function () {
                navbar.classList.toggle('navbar-mobile');
                mobileNavToggle.classList.toggle('bi-list');
                mobileNavToggle.classList.toggle('bi-x');
            });
        }
    };

    handleMobileNavToggle();

    return () => {
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      if (mobileNavToggle) {
          mobileNavToggle.removeEventListener('click', handleMobileNavToggle);
      }
  };
}, []);

    return(
         <>
           <header id="header" className="header d-flex align-items-center">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
              <a href="index.html" className="logo d-flex align-items-center">
              <li><Link to="/"><h1>Financial Sevice Bank<span>.</span></h1></Link></li> 
              </a>
              <nav id="navbar" className="navbar">
                <ul>
                <li><Link to="/HomePage">Home</Link></li>
                <li><Link to="/Services">Services</Link></li>
                <li><Link to="/AboutUs">About Us</Link></li>
                <li><Link to="/ContactUs">Contact Us</Link></li>
                {AuthService.GetUserRole() == 'Admin' &&<li><Link to="/Navbar"></Link></li>}
                {AuthService.LoggedInUser() == null && <li><Link to="/">Login</Link></li>}
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