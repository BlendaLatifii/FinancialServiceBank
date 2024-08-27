import React, { useEffect, useState } from "react";
import { Button, Segment, Select } from "semantic-ui-react";
import { UserModel } from "../../interfaces/users";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik,Form } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../FormElements/MyTextInput";
import { BranchModel } from "../../interfaces/branch-model";
import { BranchService } from "../../services/BranchService";
import Header from "../Header";
import Footer from "../Footer";

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
        if(id){
          const response = await BranchService.GetBranchDetails(id!);
          const userData = response;
          setValues({
            branchId: userData.branchId,
            branchName: userData.branchName,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            opened: userData.opened,
          }as BranchModel)
        }
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
     <Header/>
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.branchId != null ? 'Edit' : 'Add'} Branch
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.branchId != null ? 'edit' : 'create'} a branch.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
      <Formik validationSchema={validation}
           enableReinitialize 
           initialValues={values} 
           onSubmit={values => handleSubmit(values)}>
           {({handleSubmit,isSubmitting,dirty,isValid})=>(
        <Form  className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput fluid
           label={<label> Branch Name</label>}
            placeholder="Branch Name"
            name="branchName"
            onChange={handleChange}
          />
          <MyTextInput
           label={<label> Address</label>}
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
          <MyTextInput
           label={<label> Phone Number</label>}
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <MyTextInput
           label={<label> Opened</label>}
            placeholder="Opened"
            name="opened"
            onChange={handleChange}
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
