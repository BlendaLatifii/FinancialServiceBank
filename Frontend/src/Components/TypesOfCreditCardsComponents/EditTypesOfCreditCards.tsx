import React, { useEffect, useState } from "react";
import { Button,  Segment } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../FormElements/MyTextInput";
import { TypesOfCreditCardsModel } from "../../interfaces/TypesOfCreditCards-model";
import { TypesOfCreditCardsService } from "../../services/TypesOfCreditCardsService";
import Header from "../Header";
import Footer from "../Footer";


export default function EditTypesOfCreditCards() {
  const { id } = useParams<{ id: string}>();
 const[values, setValues]= useState<TypesOfCreditCardsModel>({
      id:id!,
      name:'',
      description: '',
  } as TypesOfCreditCardsModel);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const response = await TypesOfCreditCardsService.GetTypesOfCreditCardsDetails(id!);
          const typeData = response;
          setValues({
              id:typeData.id!,
              name:typeData.name,
              description:typeData.description,
          }as TypesOfCreditCardsModel)
        }
      } catch (error) {
        console.error("Error fetching types of credit cards details:", error);
      }
    };

    fetchData();

  }, [id]);

 const validation = yup.object<TypesOfCreditCardsModel>({
   name:yup.string().required(),
   description:yup.string().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:TypesOfCreditCardsModel) => {
   await TypesOfCreditCardsService.EditOrAddType(model);
   sendToOverview();
  };

  function sendToOverview(){
   navigate('/TypesOfCreditCardsTable');
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  };

  return (
    <>
    
    <Header/>
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Type Of CreditCard
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a type of Creditcard.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
          label={<label>Name</label>}
            placeholder="name"
            name="name"
             onchange={handleChange}
          />
          <MyTextInput fluid
          label={<label>Description</label>}
            placeholder="description"
            name="description"
             onchange={handleChange}
          />

           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }} />
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
