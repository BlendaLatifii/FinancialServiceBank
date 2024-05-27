import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../FormElements/MyTextInput";
import { TypesOfCreditCardsModel } from "../../interfaces/TypesOfCreditCards-model";
import { TypesOfCreditCardsService } from "../../services/TypesOfCreditCardsService";


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
        const response = await TypesOfCreditCardsService.GetTypesOfCreditCardsDetails(id!);
        const typeData = response;
        setValues({
            id:typeData.id!,
            name:typeData.name,
            description:typeData.description,
        })
      } catch (error) {
        console.error("Error fetching loans type details:", error);
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
    
      <h1 style={{ marginLeft: "15px" }}>Types Of Credit Cards</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="name"
            name="name"
             onchange={handleChange}
          />
          <MyTextInput fluid
            placeholder="description"
            name="description"
             onchange={handleChange}
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
