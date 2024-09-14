import React, { Component, useEffect, useState } from 'react';
import './Services.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import { BranchService } from '../services/BranchService';
import { BranchModel } from '../interfaces/branch-model';
import { Link } from 'react-router-dom';
import { BankAccountService } from '../services/BankAccountService';
import { BankAccountModel } from '../interfaces/bankAcc-model';
import { TypesOfCreditCardsService } from '../services/TypesOfCreditCardsService';
import { TypesOfCreditCardsModel } from '../interfaces/TypesOfCreditCards-model';
function Services() {
  const [branches, setBranches] = useState<BranchModel[]>([]);
  const [accounts, setAccounts] = useState<BankAccountModel[]>([]);
  const [creditCards, setCreditCards] = useState<TypesOfCreditCardsModel[]>([]);
  useEffect(() => {
    async function fetchCreditCards() {
      const result = await TypesOfCreditCardsService.GetAllTypes();
      setCreditCards(result);
    }
    fetchCreditCards();
  }, []);
  
  useEffect(() => {
    async function fetchBranches() {
      const result = await BranchService.GetAllBranches();
      setBranches(result);
    }
    fetchBranches();
  }, []);
  

  useEffect(() => {
    async function fetchBankAccounts() {
      const result = await BankAccountService.GetAllBankAcc();
      setAccounts(result);
    }
    fetchBankAccounts();
  }, []);
  

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
  <div className="account-list">
        <div className="accounts-container">
            {creditCards.map(creditCard => (
                <div key={creditCard.id} className="account-card">
                    <h3>{creditCard.name}</h3>
                    <p>{creditCard.description}</p>
                </div>
            ))}
        </div>
</div>
<div className="account-list">
    <Link to="/EditClientAccount" className="link-info">
        <div className="accounts-container">
            {accounts.map(account => (
                <div key={account.id} className="account-card">
                    <h3>{account.accountType}</h3>
                </div>
            ))}
        </div>
    </Link>
</div>
        <div className="branch-list-container">
            <h1>Branches</h1>
            <ul className="branch-list">
                {branches.map((branch, index) => (
                    <li key={index} className="branch-item">
                        <span className="branch-name">{branch.branchName}</span>
                        <span className="branch-address">{branch.address}</span>
                        <span className="branch-opened">{branch.opened}</span>
                    </li>
                ))}
            </ul>
        </div>
  </div>
</main>
  <Footer/>
</div>
  );
}

export default Services;