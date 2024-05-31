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

export default function EditUser() {
  const { id } = useParams<{ id: string}>();
  const[values, setValues]= useState<UserModel>({
       id:id!,
       userName: '',
       lastName:'',
       email:'',
       password:'',
       role: Role.Member
   } as UserModel)

   useEffect(() => {
    fetchData();
  }, []);
  const roleSelectList =  Object.keys(Role).map((key,i) => ({
    key: i,
    value: i,
    text: Role[+key]
  })).filter(x=> x.text != '' && x.text != null);
  const fetchData = async () => {
    if(!id){
      return;
    }
      const response = await UserService.GetUserDetails(id!);
      const userData = response;
      setValues({
        id: userData.id,
        userName: userData.userName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      }as UserModel);
  };

  const validation = yup.object<UserModel>({
    email:yup.string().required().email(),
    userName: yup.string().required(),
    lastName: yup.string().required(),
})
  const navigate = useNavigate();

   const handleSubmit = async (model:UserModel) => {
    // e.preventDefault();
    await UserService.EditOrAddUser(model);
    sendToOverview();
   };

   function sendToOverview(){
    navigate('/RegisterTable')
   }

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setValues({ ...values, [name]: value });
   };
   if(roleSelectList == null || values == null){
    return  <div className="ui active centered inline loader"></div>
   }
   return (
     <>
     
       <h1 style={{ marginLeft: "15px" }}>Edit User</h1>
       <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
       <Formik validationSchema={validation}
            enableReinitialize 
            initialValues={values} 
            onSubmit={values => handleSubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
         <Form  className='ui form'style={{backgroundColor:"#f5f6f7"}}  onSubmit={handleSubmit} autoComplete="off">
           <MyTextInput fluid
             placeholder="Username"
             name="userName"
             onChange={handleChange}
           />
           <MyTextInput
             placeholder="Lastname"
             name="lastName"
             onChange={handleChange}
           />
           <MyTextInput
             placeholder="Email"
             name="email"
             onChange={handleChange}
           />
           <MyTextInput
             placeholder="Password"
             name="password"
             onChange={handleChange}
           />
            <MySelectInput name="role" placeholder='Select Role' options={roleSelectList} />
            <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" />
           <Button floated="right" onClick={sendToOverview} className="ui blue basic button">Cancel</Button>
         </Form>
          )}
          </Formik>
       </Segment>
     </>
   );
  }
