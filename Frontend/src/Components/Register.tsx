import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      let body = {
        userName: formData.userName,
        lastName: formData.lastName,
        email:formData.email,
        password: formData.password
      }
      const response = await AuthService.Register(body);
       setRegistered(true);
       navigate("/login");
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
      <section className="text-center">
        <div className="p-5 bg-image" style={{
          marginTop: "-100px",
          backgroundImage: `url(${process.env.PUBLIC_URL}/log.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px'
        }}></div>
 
 <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(40px)'
        }}>
    <div className="card-body py-5 px-md-5">

      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-5">Sign up now</h2>
          <form  onSubmit={handleSubmit}>
            
            <div className="row">
              <div className="col-md-6 mb-4">
                <div data-mdb-input-init className="form-outline">
                  <input type="text" id="username" className="form-control" name="userName" value={formData.userName}
                      onChange={handleChange}/>
                  <label className="form-label" htmlFor="form3Example1"> Username</label>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div data-mdb-input-init className="form-outline">
                  <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName}
                      onChange={handleChange} />
                  <label className="form-label" htmlFor="lastName">Last name</label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="email" name="email" className="form-control" value={formData.email}
                      onChange={handleChange} />
              <label className="form-label" htmlFor="email">Email address</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="password" className="form-control"   name="password" value={formData.password}
                      onChange={handleChange} />
              <label className="form-label" htmlFor="password">Password</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="confirmPassword" className="form-control"   name="confirmPassword" value={formData.confirmPassword}
                     onChange={handleChange}/>
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
              Sign up
            </button>

            <p>
                    Already a member?{' '}
                    <Link to="/Login" className="link-info">
                      Log in
                    </Link>
                  </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
