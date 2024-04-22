import React, { Component } from 'react';
import './Services.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';

function Services() {
  return (
    <div>
    <Header/>
<main>
  <div className="p-3 mb-2 bg-info-subtle text-black" >
    <br/>
    <div className="justify-content-start ms-1">
      <div className="text-center">
        <div className="text-wrap" style={{ width: '8rem', fontSize: '15px', backgroundColor: 'rgba(248, 88, 0, 0.2)', color: 'rgba(248, 90, 64, 0.8)', borderRadius: '20px', padding: '10px' }}>
        New Service
        </div>
      </div>
      <br/>
      <div>
        <img src={process.env.PUBLIC_URL + './wire_feature_Tactile-Cards_1010x568-removebg-preview.png'} className="img-fluid float-end" alt="..." />
      </div>
      <div className="text-wrap d-flex justify-content-start">
        <div>
          <p className="fw-light fst-italic lh-sm" style={{ fontSize: '50px', maxWidth: '30rem' }}>Say Hello To The Last Banking Management Solution!</p>
          <p className="fw-lighter " style={{ color: 'rgb(100, 100, 100)', maxWidth: '30rem', fontFamily: 'sans-serif' }}>In addition to smart chipsets, the new e-FSB credit cards are also connected directly to Wi-fi and smart devices for doing banking and managing them.</p>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="button" className="btn btn-lg" style={{ background: 'linear-gradient(to top right, white 0%, yellow 100%)', fontSize: '15px', marginRight: '10px' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'black' }}>Read More
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"/></svg></a>
        </button>
        <button type="button" className="btn btn-secondary btn-lg" style={{ fontSize: '15px' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Skip This Service</a>
        </button>
      </div>
      <br />
      <div className="text-wrap">
        <p className="fw-light lh-1" style={{ fontSize: '20px', width: '30rem' }}>Our Official Partners</p>
        <a href="https://usa.visa.com/"><img src={process.env.PUBLIC_URL + './visa-logo-800x450-removebg-preview.png'} className="rounded m-2" alt="..." style={{ width: '50px' }} /></a> {/* Përdorimi i logotës së Visa */}
        <a href="https://www.mastercard.us/"><img src={process.env.PUBLIC_URL + './Mastercard_logo.0-removebg-preview.png'} className="rounded m-2" alt="..." style={{ width: '50px' }} /></a> {/* Përdorimi i logotës së Mastercard */}
        <a href="https://www.paypal.com/rs/home"><img src={process.env.PUBLIC_URL + './PayPal-Logo-removebg-preview.png'} className="rounded m-2" alt="..." style={{ width: '50px' }} /></a> {/* Përdorimi i logotës së PayPal */}
        <a href="https://www.apple.com/apple-pay/"><img src={process.env.PUBLIC_URL + './2560px-Apple_Pay_logo.svg-removebg-preview.png'} className="rounded m-2" alt="..." style={{ width: '50px' }} /></a> {/* Përdorimi i logotës së Apple Pay */}
        <a href="https://www.skrill.com/en/"><img src={process.env.PUBLIC_URL + './Skrill_primary_logo_RGB.svg-removebg-preview.png'} className="rounded m-2" alt="..." style={{ width: '50px' }} /></a> {/* Përdorimi i logotës së Skrill */}
      </div>
    </div>
    <br/>
    <div className="d-flex justify-content-center">
  <div className="card mb-3 bg-info bg-opacity-25 text-center" style={{width: '20rem', marginRight: '20px', borderWidth: '0'}}>
    <br/>
    <h5 className="card-title">BrightCard</h5>
    <img src={process.env.PUBLIC_URL + './10022-removebg-preview.png'} className="card-img-top" alt="..."/>
    <div className="card-body">
      <p className="card-text text-position">With BrightCard in your pocket every shopping experience is unique. BrightCard offers you a wide range of benefits when using it for purchases, where you can benefit up to 20% bonus.</p>
      <a href="#" className="btn btn-success">Apply</a>
    </div>
  </div>
  <div className="card mb-3 bg-info bg-opacity-25 text-center" style={{width: '20rem', marginRight: '20px', borderWidth: '0'}}>
    <br/>
    <h5 className="card-title">GoldCard</h5>
    <img src={process.env.PUBLIC_URL + './240_F_485729140_8XpCyC133tSGSioMzVikHd5wItfJcfLD-removebg-preview.png'} className="card-img-top" alt="..."/>
    <div className="card-body">
      <p className="card-text bg- text-position">GoldCard is a major innovation in the field of financial services around the world, bringing a new and advanced experience for its users.</p>
      <a href="#" className="btn btn-success">Apply</a>
    </div>
  </div>
  <div className="card mb-3 bg-info bg-opacity-25 text-center" style={{width: '20rem', borderWidth: '0'}}>
    <br/>
    <h5 className="card-title">BrightBlueCard</h5>
    <img src={process.env.PUBLIC_URL + './1000_F_221854470_esEmWMFah72WiKbYM0Kedpay5XjyjJkE-removebg-preview.png'} className="card-img-top" alt="..."/>
    <div className="card-body">
      <p className="card-text text-position">BrightBlueCard is the product that has truly revolutionized consumer spending around the whole world. This credit card offers a package of financial options for purchases.</p>
      <a href="#" className="btn btn-success">Apply</a>
    </div>
  </div>
</div>
  </div>
</main>
  <Footer/>
</div>
  );
}

export default Services;