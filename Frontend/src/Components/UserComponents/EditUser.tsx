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
import Header from "../Header";
import Footer from "../Footer";

export default function EditUser() {
  const { id } = useParams<{ id: string}>();
  const [registred, setRegistred] = useState(false);
  const[values, setValues]= useState<UserModel>({
       id:id!,
       userName: '',
       lastName:'',
       email:'',
       password:'',
       personalNumberId:null,
       middleName: null,
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

    const roleSelectList =  Object.keys(Role).map((key,i) => ({
      key: i,
      value: +i,
      text: Role[+key]
    })).filter(x=> x.text != '' && x.text != null);
      const response = await UserService.GetUserDetails(id!);
      const userData = response;
      setValues({
        id: userData.id,
        userName: userData.userName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        personalNumberId: userData.personalNumberId,
        middleName: userData.middleName,
      }as UserModel);
  };
  const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let model = {
        id: values.id,
        personalNumberId: values.personalNumberId,
        userName: values.userName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        password:values.password
      }
      const response = await axios.post(`https://localhost:7254/api/Account/register`,model);
      setRegistred(true);
      navigate("/RegisterTable");
    } catch (error) {
      console.error('Error creating account :', error);
    }
  };

   function sendToOverview(){
    navigate('/RegisterTable')
   }

   const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     const { name, value } = e.target;
     setValues({ ...values, [name]: value });
   };
   if(roleSelectList == null || values == null){
    return  <div className="ui active centered inline loader"></div>
   }
   return (
     <>
      <Header/>
       <h1 style={{ marginLeft: "15px" }}>Edit User</h1>
          <form onSubmit={handleSubmit} style={{ padding: "20px", margin: "20px" }}>
        <div className="form-group">
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder=" UserName"
            className="form-control"
            id="userName"
            name="userName"
            value={values.userName!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder=" MiddleName"
            className="form-control"
            id="middleName"
            name="middleName"
            value={values.middleName!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder=" LastName"
            className="form-control"
            id="lastName"
            name="lastName"
            value={values.lastName!}
            onChange={handleChange}
          />
        </div>
          <div className="form-group">
            <input
              style={{ padding: "5px", margin: "5px" }}
              type="email"
              placeholder="Email"
              className="form-control"
              id="email"
              name="email"
              value={values.email!}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ padding: "5px", margin: "5px" }}
              type="text"
              placeholder="Password"
              className="form-control"
              id="password"
              name="password"
              value={values.password!}
              onChange={handleChange}
            />
          </div>
          <select
                   style={{ padding: "5px", margin: "5px" }}
                   className="form-control"
                   id="role"
                   name="role"
                   value={values.role!}
                   onChange={handleChange}
                 >
            {roleSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "5px", margin: "5px" }}
        >
          Submit
        </button>
      </form>
      <Footer/>
     </>
   );
  }
