import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { UserModel } from "../../interfaces/users";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../FormElements/MyTextInput";
import MySelectInput from "../../FormElements/DropDown";
import { ClientModel } from "../../interfaces/client-model";
import { ClientService } from "../../services/ClientService";

export default function EditUser() {
 const { id } = useParams<{ id: string}>();
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
     const userData = response;
     setValues({
       id: userData.id,
       personalNumberId: userData.personalNumberId,
       firstName: userData.firstName,
       middleName: userData.middleName,
       lastName: userData.lastName,
       phoneNumber:userData.phoneNumber,
       emailAddress:userData.emailAddress,
       state:userData.state,
       city:userData.city,
       zipCode:userData.zipCode,
     }as ClientModel);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchData();

  }, [id]);

 const validation = yup.object<UserModel>({
  personalNumberId: yup.string().required(),
  state: yup.string().required(),
   emailAddress:yup.string().required().email(),
   firstName: yup.string().required(),
   lastName: yup.string().required(),
   middleName: yup.string().required(),
   phoneNumber: yup.string().required(),
   city: yup.string().required(),
   zipCode: yup.string().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:ClientModel) => {
   // e.preventDefault();
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
    
      <h1 style={{ marginLeft: "15px" }}>Edit Client</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="Personal Number"
            name="personalNumberId"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="firstName"
            name="firstName"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="middleName"
            name="middleName"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="lastName"
            name="lastName"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Email"
            name="emailAddress"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="State"
            name="state"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="city"
            name="city"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="zipCode"
            name="zipCode"
            onChange={handleChange}
          />
           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
          <Button floated="right" onClick={sendToOverview} type="submit"className="ui blue basic button">Cancel</Button>
        </Form>
         )}
         </Formik>
      </Segment>
    </>
  );
 }
