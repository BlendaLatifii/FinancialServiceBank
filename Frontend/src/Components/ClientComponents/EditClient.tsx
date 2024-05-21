import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import { ClientService } from "../../services/ClientService";
import MyTextInput from "../../FormElements/MyTextInput";
import { ClientModel } from "../../interfaces/client-model";

export default function EditClient() {
 const {id } = useParams<{ id: string}>();
 const[values, setValues]= useState<ClientModel>({
     id:id!,
    personalNumberId:'',
    firstName: '',
     middleName:'',
    lastName:'',
    phoneNumber:'',
    emailAddress:'',
    state:'',
    city:'',
    zipCode:''
  } as ClientModel)

     useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await ClientService.GetClientDetails(id!);
            const userData=response;
            setValues({
              id: userData.id!,
              personalNumberId: userData.personalNumberId,
              firstName:userData.firstName,
              middleName:userData.middleName,
              lastName: userData.lastName,
              phoneNumber:userData.phoneNumber,
              emailAddress: userData.emailAddress,
              state:userData.state,
              city:userData.city,
              zipCode:userData.zipCode
            }as ClientModel);
          } catch (error) {
            console.error("Error fetching client details:", error);
          }
        };
    
        fetchData();
    
      }, [id!]);



 const validation = yup.object<ClientModel>({
  personalNumberId:yup.string().required(),
   emailAddress:yup.string().required().email(),
   firstName: yup.string().required(),
   middleName: yup.string().required(),
   lastName: yup.string().required(),
   phoneNumber: yup.string().required(),
   state: yup.string().required(),
   city: yup.string().required(),
   zipCode: yup.string().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:ClientModel) => {
   //e.preventDefault();
   await ClientService.EditOrAddClient(model);
   sendToOverview();
  };

  function sendToOverview(){
   navigate('/ClientTable')
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  return (
    <>
    
      <h1 style={{ marginLeft: "15px" }}>Client</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput 
            placeholder="Personal Number"
            name="personalNumberId"
            onChange={handleChange}
          />
          <MyTextInput 
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
          />
           <MyTextInput 
            placeholder="Middle name"
            name="middleName"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
          />
           <MyTextInput 
            placeholder="Phone number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Email"
            name="emailAddress"
            onChange={handleChange}
          />
           <MyTextInput 
            placeholder="State"
            name="state"
            onChange={handleChange}
          />
           <MyTextInput 
            placeholder="City"
            name="city"
            onChange={handleChange}
          />
           <MyTextInput 
            placeholder="Zip Code"
            name="zipCode"
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
