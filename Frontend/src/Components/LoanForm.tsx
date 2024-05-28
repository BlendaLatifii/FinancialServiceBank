import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import jQuery
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';


type Props = {}

export default function LoanForm({ }: Props) {

  return (
    <>
    <Header/>
        <form style={{ padding: '20px', margin: '20px' }}> 
        <h2>Apliko per Kredi</h2>
                   <div className="tab-pane" data-id="2" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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
                      </div>
                     </form>
          <Footer/>           
    </>
  );
}
