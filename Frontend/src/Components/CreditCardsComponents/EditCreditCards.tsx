import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import * as yup from 'yup';
import { ListItemModel } from '../../interfaces/list-item-model';
import { TypesOfCreditCardsService } from '../../services/TypesOfCreditCardsService';
import { SelectListItem } from '../../interfaces/select-list-item';
import { CreditCardsModel } from '../../interfaces/creditCards-model';
import { Button,  Segment, Select } from "semantic-ui-react";
import { Formik,Form } from 'formik';
import MyTextInput from "../../FormElements/MyTextInput";
import MySelectInput from "../../FormElements/DropDown";
import { TypesOfCreditCardsModel } from '../../interfaces/TypesOfCreditCards-model';
import { CreditCardsService } from '../../services/CreditCardsService';

export default function EditCreditCards() {
  const { id } = useParams<{ id: string}>();
  const [typesOfCreditCards, setTypesOfCreditCards] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<CreditCardsModel>({
    id:id!,
    clientAccountNumber: '',
    typesOfCreditCardsID: null,
  } as CreditCardsModel);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await CreditCardsService.GetCreditCardsDetails(id!);
     const userData = response;
     setValues({
       id: userData.id!,
       clientAccountNumber: userData.clientAccountNumber,
       typesOfCreditCardsID: userData.typesOfCreditCardsID
     }as CreditCardsModel);
    }
  };
  
  fetchData();

}, [id!]);


const validation = yup.object<CreditCardsModel>({
  clientAccountNumber:yup.string().required(),
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  };

const handleSubmit = async (model:CreditCardsModel) => {
  await CreditCardsService.EditOrAddCreditCards(model);
  navigate('/CreditCardsTable');
 };
  const fetchCreditCardsTypes = async () => {
    try {
      const response = await TypesOfCreditCardsService.GetSelectList(); 

      setTypesOfCreditCards(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  useEffect(() => {
    fetchCreditCardsTypes();
  }, []);

  return (
    <>  
    <Header/>
      <h1 style={{ marginLeft: "15px" }}>{ values.id != null ?'Edit': 'Add'} CreditCards</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="Account Number"
            name="clientAccountNumber"
            onChange={handleChange}
          />
            <MySelectInput name="typesOfCreditCardsID" onChange={handleChange} placeholder='Select Credit Card Type' options={typesOfCreditCards} />

           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
        </Form>
         )}
         </Formik>
      </Segment>
      <Footer/>
    </>
  );
}
