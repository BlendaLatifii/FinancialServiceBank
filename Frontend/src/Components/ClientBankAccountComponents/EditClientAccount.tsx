import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import { ClientBankAccountService } from "../../services/ClientBankAccountService";
import MyTextInput from "../../FormElements/MyTextInput";
import MySelectInput from "../../FormElements/DropDown";
import { ClientBankAccountModel } from "../../interfaces/clientaccount-model";
import { SelectListItem } from "../../interfaces/select-list-item";
import { BankAccountService } from "../../services/BankAccountService";
import { BranchService } from "../../services/BranchService";

export default function EditClientAccount() {
 const { id } = useParams<{ id: string}>();
 const [accountTypeSelectList, setAccountTypeSelectList] = useState<SelectListItem[]>([]);
 const [branchSelectList, setBranchSelectList] = useState<SelectListItem[]>([]);
 const [values, setValues] = useState<ClientBankAccountModel>({
    id: id!,
    personalNumber: '',
    currentBalance: null,
    bankAccountId: null,
    branchId:null
  } as ClientBankAccountModel);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const response = await ClientBankAccountService.GetBankAccDetails(id!);
          const userData=response;
          setValues({
          id: userData.id!,
          personalNumber: userData.personalNumber,
          currentBalance: userData.currentBalance,
          bankAccountId:userData.bankAccountId,
          branchId:userData.branchId
          }as ClientBankAccountModel)
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchData();
    if (id) {
      ClientBankAccountService.DeductMaintenanceFeesAfterAMonth();
    }
  }, [id!]);
 const validation = yup.object<ClientBankAccountModel>({
   personalNumber:yup.string().required(),
   currentBalance: yup.number().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:ClientBankAccountModel) => {
   // e.preventDefault();
   await ClientBankAccountService.EditOrAddBankAcc(model);
   sendToOverview();
  };

  function sendToOverview(){
   navigate('/')
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const fetchAccountTypes = async () => {
    try {
      const response = await BankAccountService.GetSelectList(); 

      setAccountTypeSelectList(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  useEffect(()=>{
    fetchAccountTypes()
  },[])

  const fetchBranch = async () => {
    try {
      const response = await BranchService.GetSelectList(); 

      setBranchSelectList(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

    } catch (error) {
      console.error('Error fetching branch:', error);
    }
  };

  useEffect(()=>{
    fetchBranch()
  },[])

  return (
    <>
    
      <h1 style={{ marginLeft: "15px" }}>{ values.id != null ?'Edit': 'Add'} ClientBankAccount</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="Personal Number"
            name="personalNumber"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Current Balance"
            name="currentBalance"
            onChange={handleChange}
          />
           <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="bankAccountId"
            name="bankAccountId"
            value={values.bankAccountId!}
            onChange={handleChange}
          >
            {branchSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
          <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="branchId"
            name="branchId"
            value={values.branchId!}
            onChange={handleChange}
          >
            {branchSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>

           <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
          <Button floated="right" onClick={sendToOverview} className="ui blue basic button">Cancel</Button>
        </Form>
         )}
         </Formik>
      </Segment>
    </>
  );
 }
