import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Services from "./Components/Services";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Routes, Route } from "react-router-dom";
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
import EditClient from "./Components/ClientComponents/EditClient";
import ClientAccount from "./Components/ClientBankAccountComponents/ClientAccount";
import ClientAccountTable from "./Components/ClientBankAccountComponents/ClientAccountTable";
import EditClientAccount from "./Components/EditClientAccount";
import EditLoansType from "./Components/LoansTypeComponents/EditLoansType";
import LoansTypeTable from "./Components/LoansTypeComponents/LoansTypeTable";

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
            toast.error(data);
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
    {/* isAdmin &&  */}
    { <Navbar/>}
      <Routes>
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EditUser/:id" element={<EditUser />} />
        <Route path="/AddUser" element={<EditUser />} />
        <Route path="/RegisterTable" element={<RegisterTable />} />
        <Route path="/BranchTable" element={<BranchTable />} />
        <Route path="/ContactTable" element={<ContactTable />} />
        <Route path="/AddBranches" element={<EditBranch />}/>
        <Route path="/EditBranch/:id" element={<EditBranch />}/>
        <Route path="/AddBankAccount" element={<EditBankAccount/>}/>
        <Route path="/EditBankAccount/:id" element={<EditBankAccount/>}/>
        <Route path="/AccountTable" element={<AccountTable />}/>
        <Route path="/AddLoanType" element={<EditLoansType/>}/>
        <Route path="/EditLoansType/:id" element={<EditLoansType/>}/>
        <Route path="/LoansTypeTable" element={<LoansTypeTable />}/>
        <Route path="/RegisterForClients" element={<RegisterForClients />} />
        <Route path="/AddClient" element={<EditClient/>}/>
        <Route path="/EditClient/:id" element={<EditClient/>}/>
        <Route path="/ClientTable" element={<ClientTable />}/>
        <Route path="/AddClientAccount" element={<EditClientAccount/>}/>
        <Route path="/EditClientAccount/:id" element={<EditClientAccount/>}/>
        <Route path="/ClientAccount" element={<ClientAccount />}/>
        <Route path="/ClientAccountTable" element={<ClientAccountTable />}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
