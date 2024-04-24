import React, { useState, useEffect } from 'react';
import './LoanForm.css';
import $ from 'jquery'; // Import jQuery
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


type Props = {}

function LoanForm({ }: Props) {

  useEffect(() => {
    $(".hapitjeter").on('click', function () {
      var page = $(this).data("id");

      if (page == 3) {

      } else {
        var nextPage = page + 1;
        $(".nav-link[data-id='" + page + "']").removeClass('active');
        $(".nav-link[data-id='" + nextPage + "']").addClass('active');

        $("div[data-id='" + page + "']").removeClass(['show', 'active']);
        $("div[data-id='" + nextPage + "']").addClass(['show', 'active']);
      }
    });

    $(".hapikaluar").on('click', function () {
      var page = $(this).data("id");

      if (page == 1) {

      } else {
        var previousPage = page - 1;
        $(".nav-link[data-id='" + page + "']").removeClass('active');
        $(".nav-link[data-id='" + previousPage + "']").addClass('active');

        $("div[data-id='" + page + "']").removeClass(['show', 'active']);
        $("div[data-id='" + previousPage + "']").addClass(['show', 'active']);
      }
    });

  }, []);

  const handleLogin = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
  };

  return (
    <>


      {/* Header Section */}
      <section id="topbar" className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">contact@example.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 5589 55488 55</span>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </section>
      {/* End Top Bar */}

      <header id="header" className="header d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1>Impact<span>.</span></h1>
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="blog.html">Support</a></li>
              <li className="dropdown">
                <a href="#">
                  <span>Log out</span>
                  <i className="bi bi-chevron-down dropdown-indicator"></i>
                </a>
                <ul>
                  <li><a href="#">Drop Down 1</a></li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Drop Down</span>
                      <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </a>
                    <ul>
                      <li><a href="#">Deep Drop Down 1</a></li>
                      <li><a href="#">Deep Drop Down 2</a></li>
                      <li><a href="#">Deep Drop Down 3</a></li>
                      <li><a href="#">Deep Drop Down 4</a></li>
                      <li><a href="#">Deep Drop Down 5</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Drop Down 2</a></li>
                  <li><a href="#">Drop Down 3</a></li>
                  <li><a href="#">Drop Down 4</a></li>
                </ul>
              </li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          {/* .navbar */}
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        </div>
      </header>
      {/* End Header */}



      {/* Start of Form*/}
      <div className="container">
        <div className="row">
          <form className="needs-validation" onSubmit={handleLogin} noValidate>
            <div className="col-lg-12 col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-body">
                  <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button data-id="1" className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><em>1</em><span> Informacion ndaj klientit</span></button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button data-id="2" className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><em>2</em><span> Informacion ndaj kredisë</span></button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button data-id="3" className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false"><em>3</em><span> Konfirmimi</span></button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" data-id="1" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">Emri</label>
                          <input type="text" className="form-control" name="emri" id="validationTooltip01" placeholder="Emri juaj" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">Mbiemri</label>
                          <input type="text" className="form-control" name="mbiemri" id="validationTooltip02" placeholder="Mbiemri juaj" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltipUsername">Data e lindjes</label>
                          <div className="input-group">
                            <input type="date" className="form-control" name="datalindjes" id="validationTooltipUsername" placeholder="Username" aria-describedby="validationTooltipUsernamePrepend" required />
                            <div className="invalid-tooltip">
                              Please choose a unique and valid username.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">Numri i telefonit</label>
                          <input type="tel" className="form-control" name="tel" id="validationTooltip02" placeholder="Mbiemri juaj" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="validationTooltipUsername">Adresa</label>
                        <input type="text" className="form-control" name="adress" id="validationTooltipUsername" placeholder="Username" aria-describedby="validationTooltipUsernamePrepend" required />
                        <div className="invalid-tooltip">
                          Please choose a unique and valid username.
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip03">Qyteti</label>
                          <input type="text" className="form-control" name="qyteti" id="validationTooltip03" placeholder="City" required />
                          <div className="invalid-tooltip">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip04">Shteti</label>
                          <input type="text" className="form-control" name="shteti" id="validationTooltip04" placeholder="Shteti" required />
                          <div className="invalid-tooltip">
                            Please provide a valid state.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip05">Zip</label>
                          <input type="text" className="form-control" name="zip" id="validationTooltip05" placeholder="Zip" required />
                          <div className="invalid-tooltip">
                            Please provide a valid zip.
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary hapitjeter float-right" type="button" data-id="1">Hapi tjeter</button>
                    </div>
                    <div className="tab-pane fade" data-id="2" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Lloji i kredisë</label>
                            <select name="lloji_kredise" className="form-control" id="exampleFormControlSelect1">
                              <option value="">Lloji i kredisë</option>
                              <option value="personal" >Kredi personale</option>
                              <option value="hipoteka">Kredi hipotekore</option>
                              <option value="makine">Kredi makine</option>
                              <option value="home">Kredi renovim shtepie</option>
                              <option value="biznesi">Kredi biznesi</option>
                              <option value="education">Kredi edukimi</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Shuma e kredisë</label>
                            <select name="shuma_kredise" className="form-control" id="exampleFormControlSelect1">
                              <option value="">Shuma e kredisë</option>
                              <option value="1000">$1,000</option>
                              <option value="5000">$5,000</option>
                              <option value="10000">$10,000</option>
                              <option value="20000">$20,000</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Metoda e pagesës</label>
                            <select name="metoda_pageses" className="form-control" id="exampleFormControlSelect1">
                              <option value="">Metoda e pagesës</option>
                              <option value="monthly">Mujore</option>
                              <option value="biweekly">Dy-javore</option>
                              <option value="weekly">Javore</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Statusi i punësisë</label>
                            <select name="statusi_punesise" className="form-control" id="exampleFormControlSelect1">
                              <option value="">Statusi i punësisë</option>
                              <option value="monthly">I punësuar</option>
                              <option value="biweekly">I pa-punë</option>
                              <option value="weekly">I vetë-punësuar</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-between">
                        <button className="btn btn-secondary hapikaluar" type="button" data-id="2">Hapi kaluar</button>
                        <button className="btn btn-primary hapitjeter" type="button" data-id="2">Hapi tjeter</button>
                      </div>
                    </div>
                    <div className="tab-pane fade" data-id="3" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                      <h1 className='text-center'>Perfundo</h1>
                      <div className="d-flex justify-between">
                        <button className="btn btn-secondary hapikaluar" type="button" data-id="3">Hapi kaluar</button>
                        <button className="btn btn-primary" type="submit">Perfundo</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
      {/* End of Form*/}

      {/* Footer Section */}
      <footer id="footer" className="footer">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <span>Impact</span>
              </a>
              <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
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
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Product Management</a></li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Graphic Design</a></li>
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
            &copy; Copyright <strong><span>Impact</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>
      {/* End Footer */}

      {/* End Footer */}
    </>
  );
}

export default LoanForm;