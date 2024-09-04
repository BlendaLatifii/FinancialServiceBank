 import React, { useEffect, useState } from "react";
 import { Button,  Segment, Select } from "semantic-ui-react";
 import { UserModel } from "../../interfaces/users";
 import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserService } from "../../services/UsersService";
import { Role } from "../../interfaces/role";
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
      console.log(values.role);
      let model = {
        id: values.id,
        personalNumberId: values.personalNumberId,
        userName: values.userName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        password:values.password,
        role: +(values.role?? Role.Member)
      }
      const response = await axios.post(`https://localhost:7254/api/Users`,model);
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
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} User
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a User.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
          <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>UserName</label>
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
          <label>MiddleName</label>
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
          <label>LastName</label>
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
          <label>PersonalNumber</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder=" Personal Number"
            className="form-control"
            id="personalNumberId"
            name="personalNumberId"
            value={values.personalNumberId!}
            onChange={handleChange}
          />
        </div>
          <div className="form-group">
            <label>Email</label>
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
            <label>Password</label>
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
          <label>Role</label>
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="submit"
           onClick={sendToOverview}
           className="ui blue basic button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
          >
          Cancel
        </button>
        <button
          type="submit"
          className="ui green button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
        >
          Submit
        </button>
        </div>
      </form>
      </Segment>
      <br/>
      <br/>
      <Footer/>
     </>
   );
  }
