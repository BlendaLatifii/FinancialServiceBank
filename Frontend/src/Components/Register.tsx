import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    lastname: '',
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
    if (formData.password!== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('https://localhost:7254/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setRegistered(true);
        navigate("/RegisterTable");
      } else {
        // Handle registration errors
        const error = await response.json();
        console.error('Registration failed:', error);
        alert('Registration failed: ' + error.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  if (registered) {
    return <Link to="/RegisterTable" />;
  }
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
                <form
                  className="border border-primary p-4"
                  style={{ width: '23rem' }}
                  onSubmit={handleSubmit}
                >
                  <div>
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                  <p style={{color:'blue'}}> Financial Service Bank</p>
                  </div>
                  <h3 className="fw-normal">Sign up</h3>

                  <div className="form-outline ">
                    <input
                      type="text" id="username" className="form-control form-control-lg "  name="username" value={formData.username}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="username">
                      Name
                    </label>
                  </div>

                  <div className="form-outline ">
                    <input type="text" id="lastname" className="form-control form-control-lg " name="lastname" value={formData.lastname}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="lastname">
                      LastName
                    </label>
                  </div>

                  <div className="form-outline ">
                    <input type="email" id="email" className="form-control form-control-lg " name="email" value={formData.email}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline">
                    <input type="password" id="password" className="form-control form-control-lg" name="password" value={formData.password}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="password">  Password </label>
                  </div>

                  <div className="form-outline">
                    <input type="password" id="confirmPassword" className="form-control form-control-lg" name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                  </div>

                  <div className="pt-1">
                    <button className="btn btn-info btn-lg btn-block" type="submit"> Sign up </button>
                  </div>
                  <p>
                    Already a member?{' '}
                    <Link to="/Login" className="link-info">
                      Log in
                    </Link>
                  </p>
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
