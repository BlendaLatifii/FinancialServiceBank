import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <>
       <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">
        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">

          <form className="border border-primary p-4" style={{width: "23rem" }}>

            <h3 className="fw-normal mb-3">Log in</h3>

            <div className="form-outline ">
              <input type="number" id="form2Example18" className="form-control form-control-lg " />
              <label className="form-label" htmlFor="form2Example18">Email</label>
            </div>

            <div className="form-outline">
              <input type="password" id="form2Example28" className="form-control form-control-lg in-color" />
              <label className="form-label" htmlFor="form2Example28">Password</label>
            </div>

            <div className="pt-1 ">
              <button className="btn btn-info btn-lg btn-block" type="button">Login</button>
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

export default App;
