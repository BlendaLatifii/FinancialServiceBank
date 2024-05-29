import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [typesOfCreditCards, setTypesOfCreditCards] = useState<SelectListItem[]>([]);
  const [formData, setFormData] = useState<CreditCardsModel>({
    clientAccountNumber: null,
    typesOfCreditCardsID: null,
  } as CreditCardsModel);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

 /* const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = {
        accountNumber: formData.accountNumber,
        typesOfCreditCardsID: formData.typesOfCreditCardsID,
      };
      const response = await axios.post(`https://localhost:7254/api/CreditCards`, body);
      setRegistered(true);
      navigate("/EditCreditCards");
    } catch (error) {
      console.error('Error creating credit card:', error);
    }
  };*/

  const handleSubmit = async (model:CreditCardsModel) => {
    // e.preventDefault();
    await CreditCardsService.EditOrAddCreditCards(model);
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

  const validation = yup.object<CreditCardsModel>({
    clientAccountNumber:yup.string().required()
 })

  return (
    <>  
      <h1 style={{ marginLeft: "15px" }}>{ formData.id != null ?'Edit': 'Add'} CreditCards</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={formData} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="Account Number"
            name="clientAccountNumber"
            onChange={handleChange}
          />
            <MySelectInput name="typesOfCreditCardsID" onChange={handleChange} placeholder='Select Bank Account' options={typesOfCreditCards} />

           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
        </Form>
         )}
         </Formik>
      </Segment>
    </>
  );
}
