import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import { ClientBankAccountService } from "../../services/ClientBankAccountService";
import MyTextInput from "../../FormElements/MyTextInput";
import { ClientBankAccountModel } from "../../interfaces/clientaccount-model";
import { SelectListItem } from "../../interfaces/select-list-item";
import { BankAccountService } from "../../services/BankAccountService";
import { BranchService } from "../../services/BranchService";
import Header from "../Header";
import Footer from "../Footer";
import { AuthService } from "../../services/AuthService";


export default function EditClientAccount() {
 const { id } = useParams<{ id: string}>();
 const [accountSelectList, setAccountSelectList] = useState<SelectListItem[]>([]);
 const [accountTypeSelectList, setAccountTypeSelectList] = useState<SelectListItem[]>([]);
 const [branchSelectList, setBranchSelectList] = useState<SelectListItem[]>([]);
 const [values, setValues] = useState<ClientBankAccountModel>({
    id: id!,
    personalNumber: '',
    currentBalance: null,
    bankAccountId: '',
    branchId:''
  } as ClientBankAccountModel);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const response = await ClientBankAccountService.GetBankAccDetails(id!);
          const userData=response;
          setValues({
          id: userData.id!,
          personalNumber: userData.personalNumber,
          currentBalance: userData.currentBalance,
          bankAccountId:userData.bankAccountId,
          branchId:userData.branchId
          }as ClientBankAccountModel)
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };
    fetchBranch();
    fetchAccount();
    fetchAccountTypes();
    fetchData();
    if (id) {
      ClientBankAccountService.DeductMaintenanceFeesAfterAMonth();
    }
  }, [id!]);
 const validation = yup.object<ClientBankAccountModel>({
   personalNumber:yup.string().required(),
   currentBalance: yup.number().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:ClientBankAccountModel) => {
   // e.preventDefault();
   await ClientBankAccountService.EditOrAddBankAcc(model);
   sendToOverview();
  };

  const isAdmin = AuthService.GetUserRole() === 'Admin';
  function sendToOverview(){
    if(isAdmin){
      navigate('/ClientAccountTable');
    } else{
      navigate('/');
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const fetchAccount = async () => {
    try {
      const response = await AuthService.GetSelectList(); 
      setAccountSelectList(response.map((item,i) => ({
        key: i,
        value: item.name,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null)); 
    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  const fetchAccountTypes = async () => {
    try {
      const response = await BankAccountService.GetSelectList(); 

      setAccountTypeSelectList(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  const fetchBranch = async () => {
    try {
      const response = await BranchService.GetSelectList(); 

      setBranchSelectList(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

    } catch (error) {
      console.error('Error fetching branch:', error);
    }
  };

  return (
    <>
    <Header/>
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Client Bank Account
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a client bank account.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
        <Formik
          validationSchema={validation}
          enableReinitialize
          initialValues={values}
          onSubmit={values => handleSubmit(values)}
        >
          {({ handleSubmit, isValid }) => (
            <Form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
              
                <div className="col-md-6-w-100%">
                
                  {/* //label={<label><i className="fas fa-user"></i> Personal Number</label>}
                   // placeholder="Personal Number"
                   // name="personalNumber"
                   // onChange={handleChange}
                   // style={{ marginBottom: "15px" }} */}
                   <label htmlFor="personalNumber">PersonalNumber:</label>
                   <select
                     style={{ padding: "5px", margin: "5px" }}
                     className="form-control"
                     id="personalNumber"
                     name="personalNumber"
                     value={values.personalNumber!}
                     onChange={handleChange}
                   >
                     <option value="" disabled>Select PersonalNumber</option>
                     {accountSelectList.map((x)=>
                       (<option key={x.key} value={x.value}>{x.text}</option>))}
                   </select>
                </div>
                <div className="col-md-6-w-100%">
                  <MyTextInput
                  label={<label><i className="fas fa-dollar-sign"></i> Current Balance</label>}
                    placeholder="Current Balance"
                    name="currentBalance"
                    onChange={handleChange}
                    style={{ marginBottom: "15px" }}
                  />
                </div>
             
                <div className="col-md-6-w-100%">
                  <select
                    className="form-control"
                    id="bankAccountId"
                    name="bankAccountId"
                    value={values.bankAccountId || ""}
                    onChange={handleChange}
                    style={{ marginBottom: "15px" }}
                  >
                    <option value="" disabled>Select a bank account type</option>
                    {accountTypeSelectList.map((x) => (
                      <option key={x.key} value={x.value}>{x.text}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6-w-100%">
                  <select
                    className="form-control"
                    id="branchId"
                    name="branchId"
                    value={values.branchId!}
                    onChange={handleChange}
                    style={{ marginBottom: "15px" }}
                  >
                    <option value="" disabled>Select branch</option>
                    {branchSelectList.map((x) => (
                      <option key={x.key} value={x.value}>{x.text}</option>
                    ))}
                  </select>
                </div>
  
              <Button floated="right" disabled={!isValid} positive type="submit" content="Submit" style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }} />
              <Button floated="right" onClick={sendToOverview} className="ui basic button" style={{ borderColor: "#003366", color: "#003366" }}>Cancel</Button>
            </Form>
          )}
        </Formik>
      </Segment>
      <br/>
      <br/>
      <Footer/>
    </>
  );
 }
