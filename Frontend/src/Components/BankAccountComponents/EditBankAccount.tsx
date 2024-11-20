import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../FormElements/MyTextInput";

import { BankAccountModel } from "../../interfaces/bankAcc-model";
import { BankAccountService } from "../../services/BankAccountService";
import Header from "../Header";
import Footer from "../Footer";

export default function EditBankAccount() {
  const { id } = useParams<{ id: string}>();
 const[values, setValues]= useState<BankAccountModel>({
      id:id!,
      accountType:'',
      accountDescription:'',
      tarifaMirembajtese:'',
  } as BankAccountModel)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const response = await BankAccountService.GetBankAccDetails(id!);
          const bankData = response;
          setValues({
              id:bankData.id,
              accountType:bankData.accountType,
              accountDescription:bankData.accountDescription,
              tarifaMirembajtese:bankData.tarifaMirembajtese,
          } as BankAccountModel)
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchData();

  }, [id]);

 const validation = yup.object<BankAccountModel>({
   accountType:yup.string().required(),
   accountDescription:yup.string().required(),
   tarifaMirembajtese:yup.string().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:BankAccountModel) => {
   await BankAccountService.EditOrAddBankAcc(model);
   sendToOverview();
  };

  function sendToOverview(){
   navigate('/AccountTable');
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  };
  return (
    <>
      <Header/>
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Bank Account
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a bank account.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
         
         <div className="col-md-6-w-100%">
          <MyTextInput fluid
           label={<label> Account Type</label>}
            placeholder="accountType"
            name="accountType"
             onChange={handleChange}
          />
          </div>
          <div className="col-md-6-w-100%">
          <MyTextInput
           label={<label> Account Description</label>}
            placeholder="Account Description"
            name="accountDescription"
            onChange={handleChange}
          />
          </div>
          <div className="col-md-6-w-100%">
          <MyTextInput
           label={<label> Tarifa Mirembajtese</label>}
            placeholder="Tarifa Mirembajtese"
            name="tarifaMirembajtese"
            onChange={handleChange}
          />
          </div>
        <br/>  
           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}/>
          <Button floated="right" onClick={sendToOverview} className="ui blue basic button">Cancel</Button>
        
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
