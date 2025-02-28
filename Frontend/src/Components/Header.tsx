import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import { AuthService } from "../services/AuthService";
function Header(){
    return(
         <>
           <header id="header" className="header d-flex align-items-center" style={{ backgroundColor: '#008374' }}>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between" >
            <Link to="/HomePage" className="logo d-flex align-items-center">
                  <h1>Financial Sevice Bank<span>.</span></h1>
           </Link>
              <nav id="navbar" className="navbar">
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Services">Services</Link></li>
                <li><Link to="/AboutUs">About Us</Link></li>
                <li><Link to="/ContactUs">Contact Us</Link></li>
                {AuthService.GetUserRole() == 'Admin' &&<li><Link to="/Navbar"></Link></li>}
                {AuthService.LoggedInUser() == null && <li><Link to="/Login">Login</Link></li>}
                </ul>
              </nav>
            </div>
          </header>
           
         </>
    );
}
export default Header;