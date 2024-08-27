import React ,{lazy , Suspense} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthService } from "./services/AuthService";
import "react-toastify/dist/ReactToastify.css";
import Navbar  from "./Components/Navbar/Navbar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
const HomePage= lazy(()=>import("./Components/HomePage"));
const Services= lazy(()=>import("./Components/Services"));
const AboutUs= lazy(()=>import("./Components/AboutUs"));
const ContactUs= lazy(()=>import("./Components/ContactUs"));
const Login= lazy(()=>import("./Components/Login"));
const Register= lazy(()=>import("./Components/Register"));
const MyProfile = lazy(() => import("./Components/MyProfile"));
const Dashboard = lazy(() => import("./Components/Dashboard"));
const EditUser = lazy(() => import("./Components/UserComponents/EditUser"));
const RegisterTable = lazy(() => import("./Components/UserComponents/RegisterTable"));
const BranchTable = lazy(() => import("./Components/BranchComponents/BranchTable"));
const ContactTable = lazy(() => import("./Components/ContactComponents/ContactTable"));
const EditBranch = lazy(() => import("./Components/BranchComponents/EditBranch"));
const EditBankAccount = lazy(() => import("./Components/BankAccountComponents/EditBankAccount"));
const AccountTable = lazy(() => import("./Components/BankAccountComponents/AccountTable"));
//const RegisterForClients = lazy(() => import("./Components/RegisterForClients"));
const ClientTable = lazy(() => import("./Components/ClientComponents/ClientTable"));
const ClientAccountTable = lazy(() => import("./Components/ClientBankAccountComponents/ClientAccountTable"));
const EditClientAccount = lazy(() => import("./Components/ClientBankAccountComponents/EditClientAccount"));
const TypesOfCreditCardsTable = lazy(() => import("./Components/TypesOfCreditCardsComponents/TypesOfCreditCardsTable"));
const EditTypesOfCreditCards = lazy(() => import("./Components/TypesOfCreditCardsComponents/EditTypesOfCreditCards"));
const CreditCardsTable = lazy(() => import("./Components/CreditCardsComponents/CreditCardsTable"));
const EditCreditCards = lazy(() => import("./Components/CreditCardsComponents/EditCreditCards"));
const Transaction = lazy(() => import("./Components/TransactionComponents/Transaction"));
const TransactionTable = lazy(() => import("./Components/TransactionComponents/TransactionTable"));
const LoanForm = lazy(() => import("./Components/LoanComponents/LoanForm"));
const LoanTable = lazy(() => import("./Components/LoanComponents/LoanTable"));
const ForgotPassword = lazy(() => import("./Components/ForgotPassword"));
const ResetPassword = lazy(() => import("./Components/ResetPassword"));

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
      const { data, status } = error.response ?? null;
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
  const isAdmin = AuthService.GetUserRole() === 'Admin';

  return (
    <>
    
    { <Navbar/>}

    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route  path="/Dashboard" element={ isAdmin ? <Dashboard /> : <Navigate to="/" replace />}/>
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/HomePage" element={  <HomePage />} />
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
       {/* // <Route path="/RegisterForClients" element={<RegisterForClients />} /> */}
        {/* <Route path="/AddClient" element={isAdmin ?<RegisterForClients/> : <Navigate to="/" replace />} /> */}
        {/* <Route path="/RegisterForClients/:id" element={isAdmin ? <RegisterForClients/> : <Navigate to="/" replace />} /> */}
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
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
