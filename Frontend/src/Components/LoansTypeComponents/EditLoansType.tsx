import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../FormElements/MyTextInput";
import { LoansTypeModel } from "../../interfaces/loanstype-model";
import { LoansTypeService } from "../../services/LoansTypeService";


export default function EditLoansType() {
  const { id } = useParams<{ id: string}>();
 const[values, setValues]= useState<LoansTypeModel>({
      id:id!,
      loanType:'',
  } as LoansTypeModel)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const response = await LoansTypeService.GetLoansTypeDetails(id!);
        const bankData = response;
        setValues({
            id:bankData.id!,
            loanType:bankData.loanType,
        })
        }
      } catch (error) {
        console.error("Error fetching loans type details:", error);
      }
    };

    fetchData();

  }, [id]);

 const validation = yup.object<LoansTypeModel>({
   loanType:yup.string().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:LoansTypeModel) => {
   await LoansTypeService.EditOrAddLoansType(model);
   sendToOverview();
  };

  function sendToOverview(){
   navigate('/LoansTypeTable');
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  };

  return (
    <>
    
      <h1 style={{ marginLeft: "15px" }}> { values.id != null ?'Edit': 'Add'} Loans Type</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="loanType"
            name="loanType"
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
