import React ,{lazy , Suspense} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthService } from "./services/AuthService";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import AdminRoute from "./Components/AdminRoute";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
const Header=lazy(()=>import("./Components/Header")); 
const Footer =lazy(()=>import("./Components/Navbar/Navbar"));
const Navbar=lazy(()=>import("./Components/Navbar/Navbar"));
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

function App() {
  axios.interceptors.request.use(async(config) => {
    config.headers.Authorization = `Bearer ${await AuthService.GetToken()}`;
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
  return (
    <>
    <Suspense>
    { <Navbar/>}
    </Suspense>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route  path="/Dashboard" element={<AdminRoute component={Dashboard}/>}/>
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/HomePage" element={ <AuthenticatedRoute component={HomePage} />  } />
        <Route path="/Services"element={<AuthenticatedRoute component={Services} />  } />
        <Route path="/MyProfile" element={ <AuthenticatedRoute component={MyProfile} />  } />
        <Route path="/AboutUs" element={ <AuthenticatedRoute component={AboutUs} /> } />
        <Route path="/ContactUs" element={ <AuthenticatedRoute component={ContactUs} /> } />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login/>}/>
        <Route path="/EditUser/:id" element={<AdminRoute component={EditUser}/>} />
        <Route path="/AddUser" element={<EditUser />} />
       <Route path="/RegisterTable" element={<AdminRoute component={RegisterTable}/>} />
       <Route path="/BranchTable" element={<AdminRoute component={BranchTable}/>} />
       <Route path="/ContactTable" element={ <AdminRoute component={ContactTable}/>} />
        <Route path="/AddBranches" element={<AdminRoute component={EditBranch}/>} />
        <Route path="/EditBranch/:id" element={<AdminRoute component={EditBranch}/>}/>
        <Route path="/AddBankAccount" element={<AdminRoute component={EditBankAccount}/>} />
        <Route path="/EditBankAccount/:id" element={ <AdminRoute component={EditBankAccount}/>} />
       <Route path="/AccountTable" element={<AdminRoute component={AccountTable}/>}/>
        <Route path="/AddClientAccount" element={<EditClientAccount />} />
        <Route path="/EditClientAccount/:id" element={<AdminRoute component={EditClientAccount}/>} /> 
        <Route path="/EditClientAccount" element={<AdminRoute component={EditClientAccount}/>} />
        <Route path="/ClientAccountTable" element={<AdminRoute component={ClientAccountTable}/>}/> 
        <Route path="/EditTypesOfCreditCards/:id" element ={<AdminRoute component={EditTypesOfCreditCards}/>} />
        <Route path="/AddTypesOfCreditCards" element ={<AdminRoute component={EditTypesOfCreditCards}/>} />
        <Route path="/TypesOfCreditCardsTable" element ={<AdminRoute component={TypesOfCreditCardsTable}/>} />
        <Route path ="/CreditCardsTable" element = {<AdminRoute component={CreditCardsTable}/>}/>
        <Route path="/EditCreditCards/:id" element = {<AdminRoute component={EditCreditCards}/>} />
        <Route path="/AddCreditCards" element = {<AdminRoute component={EditCreditCards}/>} />
        <Route path="/Transaction" element={<Transaction/>}/>
        <Route path="/AddTransaction" element={<Transaction/>}/>
        <Route path="/EditTransaction/:id" element={<AdminRoute component={Transaction}/>} />
        <Route path="/TransactionTable" element={<AdminRoute component={TransactionTable}/>}/>
        <Route path="LoanForm" element={<LoanForm />} />
        <Route path="/AddLoan" element={<LoanForm/>}/>
        <Route path="/EditLoan/:id" element={<AdminRoute component={LoanForm}/>} />
        <Route path="/LoanTable" element={ <AdminRoute component={LoanTable}/>}/>
      </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
