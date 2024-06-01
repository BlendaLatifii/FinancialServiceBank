import React from 'react'
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
// import 'jquery-smartwizard';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {}
 
function HomePage({}: Props) {
    return (
        <>    
          <Header/>
          <section id="hero" className="hero">
          <div className="container position-relative">
            <div className="row gy-5" data-aos="fade-in">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                <h2>Welcome to <span>Financial Service Bank</span></h2>
                <p>where your financial journey begins with personalized service and innovative solutions tailored just for you.</p>
               <div className="d-flex justify-content-center justify-content-lg-start">
                   <a href="#about" className="btn-get-started">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
              <img src={process.env.PUBLIC_URL + './395700.png'} className="img-fluid" alt="photo1" data-aos="zoom-out" data-aos-delay="90" />
              </div>
            </div>
          </div>
    
          <div className="icon-boxes position-relative">
            <div className="container position-relative">
              <div className="row gy-4 mt-5">
                <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                  <div className="icon-box">
                    <div className="icon"><i className="bi bi-easel"></i></div>
                       <h4 className="title">Apply here →</h4>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                  <div className="icon-box">
                    <div className="icon"><i className="bi bi-gem"></i></div>
                    <h4 className="title"><Link to="/RegisterForClients" className="link-info">Account</Link></h4>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-box">
                    <div className="icon"><i className="bi bi-geo-alt"></i></div>
                    <h4 className="title"><Link to="/Transaction" className="link-info">Transaction</Link></h4>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
                  <div className="icon-box">
                    <div className="icon"><i className="bi bi-command"></i></div>
                    <h4 className="title"><Link to="/LoanForm" className='stretched-link'>Loans</Link></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    
        <section id="stats-counter" className="stats-counter">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4 align-items-center">
              <div className="col-lg-6">
                <img src={process.env.PUBLIC_URL + './image_6329179.png'} className="img-fluid" alt="photo1" data-aos="zoom-out" data-aos-delay="90" />
              </div>
              <div className="col-lg-6">
                <div className="stats-item d-flex align-items-center">
                  <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
                  <p><strong>Happy Clients</strong> We are dedicated to providing excellent services that meet your needs and expectations</p>
                </div>
                <div className="stats-item d-flex align-items-center">
                  <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
                  <p><strong>Projects</strong> We achieve great success through collaboration and innovation</p>
                </div>
                <div className="stats-item d-flex align-items-center">
                  <span data-purecounter-start="0" data-purecounter-end="453" data-purecounter-duration="1" className="purecounter"></span>
                  <p><strong>Hours Of Support</strong> We are here to help you anytime you need</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    
         <Footer/>
        </>
      );
}

export default HomePage