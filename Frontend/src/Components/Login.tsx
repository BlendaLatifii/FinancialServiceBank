import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { LogInModel } from "../interfaces/login-model";
import { AuthService } from "../services/AuthService";
function Login() {
  const [formData, setFormData] = useState<LogInModel>({
    email: "",
    password: "",
  });

  const[isSubmitting,setIsSubmitting] = useState<boolean>(false);
  const navigete = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    var user: LogInModel = {
      email: formData.email,
      password: formData.password,
    };
    const response = await AuthService.Login(user);

    if(AuthService.role == "Member"){
      navigete("/");
    }
    else if(AuthService.role == "Admin")
      {
        navigete("/");
      }

    setIsSubmitting(false);
  }
  return (
    <>
      <section className="text-center">
        <div
          className="p-5 bg-image"
          style={{
            marginTop: "-100px",
            backgroundImage: `url(${process.env.PUBLIC_URL}/log.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        ></div>
        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(40px)",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Log in</h2>
                <form onSubmit={submitForm}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  <p className="small mb-5 pb-lg-2">
                  <Link to="/ForgotPassword" className="link-info">
                      Forgot password?
                      </Link>
                  </p>
                  <p>
                    Don't have an account?
                    <Link to="/Register" className="link-info">
                      Register here
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

export default Login;
