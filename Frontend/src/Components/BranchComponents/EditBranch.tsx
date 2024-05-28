import React, { useEffect, useState } from "react";
import { Button,  Segment, Select } from "semantic-ui-react";
import { UserModel } from "../../interfaces/users";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import { UserService } from "../../services/UsersService";
import { Role } from "../../interfaces/role";
import MyTextInput from "../../FormElements/MyTextInput";
import MySelectInput from "../../FormElements/DropDown";
import { BranchModel } from "../../interfaces/branch-model";
import { BranchService } from "../../services/BranchService";

export default function EditBranch() {
  const { id } = useParams<{ id: string}>();
 const[values, setValues]= useState<BranchModel>({
      branchId:id!,
      branchName:'',
      address:'',
      phoneNumber:'',
      opened:'',
  } as BranchModel)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BranchService.GetBranchDetails(id!);
        const userData = response;
        setValues({
          branchId: userData.branchId,
          branchName: userData.branchName,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          opened: userData.opened,
        });
      } catch (error) {
        console.error("Error fetching branch details:", error);
      }
    };

    fetchData();

  }, [id]);

 const validation = yup.object<BranchModel>({
   branchName:yup.string().required(),
   address:yup.string().required(),
   phoneNumber: yup.string().required(),
   opened: yup.string().required(),
})
 const navigate = useNavigate();

  const handleSubmit = async (model:BranchModel) => {
   await BranchService.EditOrAddBranch(model);
   sendToOverview();
  };

  function sendToOverview(){
   navigate('/BranchTable')
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  };
  return (
    <>
    
      <h1 style={{ marginLeft: "15px" }}>{ values.branchId != null ?'Edit': 'Add'} Branch</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
            placeholder="Branch Name"
            name="branchName"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <MyTextInput
            placeholder="Opened"
            name="opened"
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
