import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import jQuery
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import * as yup from 'yup';
import Header from './Header';
import Footer from './Footer';
import { LoansTypeService } from '../services/LoansTypeService';
import { SelectListItem } from '../interfaces/select-list-item';
import { Form, Formik } from 'formik';
import { Button, Segment } from 'semantic-ui-react';
import MySelectInput from '../FormElements/DropDown';
import MyTextInput from '../FormElements/MyTextInput';
import { LoanModel } from '../interfaces/loan-model';
import { LoanService } from '../services/LoanService';


type Props = {}

export default function LoanForm({ }: Props) {
  const { id } = useParams<{ id: string}>();
  const [typesOfLoans, setTypesOfLoans] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<LoanModel>({
    id:id!,
    clientAccountNumber: '',
    loansTypeId: '',
    monthlyPayment:'',
    income:'',
    employmentStatus:''
  } as LoanModel);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await LoanService.GetLoanDetails(id!);
     const userData = response;
     setValues({
       id: userData.id!,
       clientAccountNumber: userData.clientAccountNumber,
       loansTypeId:userData.loansTypeId,
       monthlyPayment:userData.monthlyPayment,
       income:userData.income,
       employmentStatus:userData.employmentStatus
     }as LoanModel);
    }
  };
  
  fetchData();

}, [id!]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  };

const handleSubmit = async (model:LoanModel) => {
  await LoanService.EditOrAddLoan(model);
  navigate('/LoanTable');
 };

 const fetchLoansTypes = async () => {
  try {
    const response = await LoansTypeService.GetSelectList(); 

    setTypesOfLoans(response.map((item,i) => ({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

  } catch (error) {
    console.error('Error fetching account types:', error);
  }
};

  useEffect(() => {
    fetchLoansTypes();
  }, []);

  const validation = yup.object<LoanModel>({
    clientAccountNumber:yup.string().required(),
    loansTypeId:yup.string().required(),
    monthlyPayment:yup.string().required(),
    income:yup.string().required(),
    employmentStatus: yup.string().required()
  });

  return (
    <>
      <Header/>
      <h1 style={{ marginLeft: "15px" }}>{ values.id != null ?'Edit': 'Add'} Loan</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
         <MySelectInput name="loansTypeId" onChange={handleChange} placeholder='Select Loan Type' options={typesOfLoans} />
         <MyTextInput fluid
            placeholder="Account Number"
            name="clientAccountNumber"
            onChange={handleChange}
          />
          <MyTextInput 
            placeholder="Monthly Payment"
            name="monthlyPayment"
            onChange={handleChange}
          />
           <MyTextInput 
            placeholder="Income"
            name="income"
            onChange={handleChange}
          />
          <MySelectInput 
              name="employmentStatus" 
              onChange={handleChange} 
              placeholder='Select Employment Status' 
              options={["i pa pune", "i punesuar", "i vete punesuar"]} 
          />

           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
        </Form>
         )}
         </Formik>
      </Segment>
      <Footer/>
    </>
  );
}
