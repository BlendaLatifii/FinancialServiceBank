import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import { FieldValues, useForm } from 'react-hook-form';
function Login() {
  
  const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm()
   
 async function submitForm(data:FieldValues){
  try {
    const response = await axios.post('./Components/Login', data); 
    console.log('Login successful:', response.data); 
  } catch(error) {
    console.log('Login failed:', error); 
  }
  }
  return (
    <>
       <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">
        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">

          <form className="border border-primary p-4" style={{width: "23rem" }} onSubmit={handleSubmit(submitForm)}>

          <p style={{color:'blue'}}> Financial Service Bank</p>
            <h3 className="fw-normal mb-3">Log in</h3>

            <div className="form-outline">
                    <input type="email" id="form2Example18" className="form-control form-control-lg in-color"
                      {...register('email', {required: 'Email is required'})}/>
                    <label className="form-label" htmlFor="form2Example18">Email</label>
                  </div>

            <div className="form-outline">
              <input type="password" id="form2Example28" className="form-control form-control-lg in-color"
               {...register('password' , {required:'password is required'})} />
              <label className="form-label" htmlFor="form2Example28">Password</label>
            </div>

            <div className="pt-1 ">
              <button className="btn btn-info btn-lg btn-block" type="button"> {isSubmitting ? 'Logging in...' : 'Login'}</button>
            </div>

            <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account?<Link to="/Register" className="link-info">Register here</Link></p>

          </form>
        </div>
      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src={process.env.PUBLIC_URL + '/photoL.png'}
          alt="Login image" className="w-70 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

export default Login;
function useform(): { register: any; gandleSubmit: any; formState: { isSubmitting: any; }; } {
  throw new Error('Function not implemented.');
}