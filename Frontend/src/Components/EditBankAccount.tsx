import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { BankAccountModel } from "../interfaces/bankAcc-model";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import { BankAccountService } from "../services/BankAccountService";
import MyTextInput from "../FormElements/MyTextInput";

export default function EditBankAccount(){
  const { id } = useParams<{ id: string}>();
  const[values, setValues]= useState<BankAccountModel>({
    id:id!,
    accountType:'',
    accountDescription:'',
} as BankAccountModel)


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await BankAccountService.GetBankAccDetails(id!);
      const bankData = response;
      setValues({
        id:bankData.id,
        accountType:bankData.accountType,
        accountDescription:bankData.accountDescription,
      });
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };

  fetchData();

}, [id]);


  const validation = yup.object<BankAccountModel>({
    accountTypeID: yup.string().required(),
    accountDescription: yup.string().required(),
  });

  const navigate = useNavigate();

  const handleSubmit = async (model:BankAccountModel) => {
    await BankAccountService.EditOrAddBankAcc(model);
    sendToOverview();
  };

  function sendToOverview(){
    navigate('/AccountTable')
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <h1 style={{ marginLeft: "15px" }}>Bank Account</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
        <Formik validationSchema={validation}
          enableReinitialize 
          initialValues={values} 
          onSubmit={values => handleSubmit(values)}>
          {({handleSubmit,isSubmitting,dirty,isValid})=>(
            <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
              <MyTextInput fluid
                placeholder="Account Type"
                name="accountType"
                onChange={handleChange}
              />
              <MyTextInput
                placeholder="Account Description"
                name="accountDescription"
                onChange={handleChange}
              />
              <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
              <Button floated="right" onClick={sendToOverview} className="ui blue basic button">Cancel</Button>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
}
