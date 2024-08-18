import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Services from "./Components/Services";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterTable from "./Components/UserComponents/RegisterTable";
import HomePage from "./Components/HomePage";
import RegisterForClients from "./Components/RegisterForClients";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthService } from "./services/AuthService";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import EditUser from "./Components/UserComponents/EditUser";
import ContactTable from "./Components/ContactComponents/ContactTable";
import BranchTable from "./Components/BranchComponents/BranchTable";
import EditBranch from "./Components/BranchComponents/EditBranch";
import EditBankAccount from "./Components/BankAccountComponents/EditBankAccount";
import AccountTable from "./Components/BankAccountComponents/AccountTable";
import ClientTable from "./Components/ClientComponents/ClientTable";
import ClientAccountTable from "./Components/ClientBankAccountComponents/ClientAccountTable";
import EditClientAccount from "./Components/ClientBankAccountComponents/EditClientAccount";
import TypesOfCreditCardsTable from "./Components/TypesOfCreditCardsComponents/TypesOfCreditCardsTable";
import EditTypesOfCreditCards from "./Components/TypesOfCreditCardsComponents/EditTypesOfCreditCards";
import Transaction from "./Components/TransactionComponents/Transaction";
import TransactionTable from "./Components/TransactionComponents/TransactionTable";
import LoanForm from "./Components/LoanComponents/LoanForm";
import CreditCardsTable from "./Components/CreditCardsComponents/CreditCardsTable";
import EditCreditCards from "./Components/CreditCardsComponents/EditCreditCards";
import LoanTable from "./Components/LoanComponents/LoanTable";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import MyProfile from "./Components/MyProfile";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute"; 

function App() {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${AuthService.token}`;
    return config;
  });

  axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      const { data, status, config } = error.response ?? null;
      switch (status) {
        case 200:
          toast.success("OK");
          break;
        case 201:
         toast.success("OK");
         break;
        case 400:
          if (data != null) {
            toast.error(data.message);
          } else { 
            toast.error("something went wrong");
          }
          break;
        case 401:
          toast.error("unauthorised");
          break;
        case 404:
          toast.error("not founded");
          break;
        case 500:
          toast.error("something went wrong");
          break;
      }
      return Promise.reject(error);
    }
  );
  const isAdmin = AuthService.GetUserRole() == 'Admin';

  return (
    <>
    { <Navbar/>}
      <Routes>
      <Route  path="/Dashboard" element={ isAdmin ? <Dashboard /> : <Navigate to="/" replace />}/>
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/EditUser/:id" element={isAdmin ? <EditUser /> : <Navigate to="/" replace />} />
        <Route path="/AddUser" element={<EditUser />} />
       <Route path="/RegisterTable" element={isAdmin ? <RegisterTable />: <Navigate to="/" replace />} />
       <Route path="/BranchTable" element={isAdmin ? <BranchTable/> : <Navigate to="/" replace />} />
       <Route path="/ContactTable" element={ isAdmin ? <ContactTable /> : <Navigate to="/" replace />} />
        <Route path="/AddBranches" element={ isAdmin ? <EditBranch /> : <Navigate to="/" replace />} />
        <Route path="/EditBranch/:id" element={isAdmin ? <EditBranch /> : <Navigate to="/" replace />} />
        <Route path="/AddBankAccount" element={isAdmin ? <EditBankAccount/> : <Navigate to="/" replace />} />
        <Route path="/EditBankAccount/:id" element={ isAdmin ? <EditBankAccount/> : <Navigate to="/" replace />} />
       <Route path="/AccountTable" element={isAdmin ? <AccountTable /> : <Navigate to="/" replace/>}/>
        <Route path="/RegisterForClients" element={<RegisterForClients />} />
        <Route path="/AddClient" element={isAdmin ?<RegisterForClients/> : <Navigate to="/" replace />} />
        <Route path="/RegisterForClients/:id" element={isAdmin ? <RegisterForClients/> : <Navigate to="/" replace />} />
        <Route path="/ClientTable" element={isAdmin ? <ClientTable/>: <Navigate to="/" replace/>}/>
        <Route path="/AddClientAccount" element={<EditClientAccount />} />
        <Route path="/EditClientAccount/:id" element={isAdmin ? <EditClientAccount/> : <Navigate to="/" replace />} /> 
        <Route path="/EditClientAccount" element={isAdmin ? <EditClientAccount /> : <Navigate to="/" replace />} />
        <Route path="/ClientAccountTable" element={isAdmin ? <ClientAccountTable/> : <Navigate to="/" replace/>}/> 
        <Route path="/EditTypesOfCreditCards/:id" element ={isAdmin ? <EditTypesOfCreditCards/> : <Navigate to="/" replace />} />
        <Route path="/AddTypesOfCreditCards" element ={isAdmin ? <EditTypesOfCreditCards/> : <Navigate to="/" replace />} />
        <Route path="/TypesOfCreditCardsTable" element ={isAdmin ? <TypesOfCreditCardsTable/> : <Navigate to="/" replace />} />
        <Route path ="/CreditCardsTable" element = {isAdmin ? <CreditCardsTable/> : <Navigate to="/" replace/>}/>
        <Route path="/EditCreditCards/:id" element = {isAdmin ? <EditCreditCards/> : <Navigate to="/" replace />} />
        <Route path="/AddCreditCards" element = {isAdmin ? <EditCreditCards /> : <Navigate to="/" replace />} />
        <Route path="/Transaction" element={<Transaction/>}/>
        <Route path="/AddTransaction" element={<Transaction/>}/>
        <Route path="/EditTransaction/:id" element={isAdmin ? <Transaction/> : <Navigate to="/" replace />} />
        <Route path="/TransactionTable" element={isAdmin ? <TransactionTable /> : <Navigate to="/" replace/>}/>
        <Route path="LoanForm" element={<LoanForm />} />
        <Route path="/AddLoan" element={<LoanForm/>}/>
        <Route path="/EditLoan/:id" element={isAdmin ? <LoanForm/> : <Navigate to="/" replace />} />
        <Route path="/LoanTable" element={ isAdmin ? <LoanTable /> : <Navigate to="/" replace/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
