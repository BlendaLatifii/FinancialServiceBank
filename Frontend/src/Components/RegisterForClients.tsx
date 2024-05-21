import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function RegisterForClients() {
  const [formData, setFormData] = useState({
    personalNumberId:'',
    firstName: '',
    middleName: '',
    lastName:'',
    phoneNumber:'',
    emailAddress: '',
    state:'',
    city:'',
    zipCode:''
  });

  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let body = {
        personalNumberId: formData.personalNumberId,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        phoneNumber:formData.phoneNumber,
        emailAddress: formData.emailAddress,
        state:formData.state,
        city:formData.city,
        zipCode:formData.zipCode
      }
      const response = await axios.post(`https://localhost:7254/api/Client`,body);
       setRegistered(true);
       
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
    <Header/>
      <div className="container">
        <div className="row">
          <form className="needs-validation" noValidate  onSubmit={handleSubmit}>
            <div className="col-lg-12 col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-body">
                  <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li className="nav-item text-center" role="presentation">
                      <button data-id="1" className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><span>Client's Information</span></button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" data-id="1" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">Personal Number</label>
                          <input type="text" className="form-control" onChange={handleChange} name="personalNumberId" id="validationTooltip01" placeholder="Client's PersonalNumber"required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">FirstName</label>
                          <input type="text" className="form-control" onChange={handleChange} name="firstName" id="validationTooltip01" placeholder="Client's MiddleName" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">Middlename</label>
                          <input type="text" className="form-control" onChange={handleChange} name="middleName" id="validationTooltip02" placeholder="Client's Surname" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">LastName</label>
                          <input type="text" className="form-control" onChange={handleChange} name="lastName" id="validationTooltip02" placeholder="Client's Personal Number" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltipUsername">BirthDate</label>
                          <div className="input-group">
                            <input type="date" className="form-control" onChange={handleChange} name="birthdate" id="validationTooltipUsername" placeholder="birthdate" aria-describedby="validationTooltipUsernamePrepend" required />
                            <div className="invalid-tooltip">
                              Please choose a unique and valid username.
                            </div>
                          </div>
                        </div> */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">PhoneNumber</label>
                          <input type="tel" className="form-control" onChange={handleChange} name="phoneNumber" id="validationTooltip02" placeholder="Client's PhoneNumber" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="validationTooltipUsername">Email-Address</label>
                        <input type="text" className="form-control" onChange={handleChange} name="emailAddress" id="validationTooltipUsername" placeholder="Email-Address" aria-describedby="validationTooltipUsernamePrepend" required />
                        <div className="invalid-tooltip">
                          Please choose a unique and valid username.
                        </div>
                      </div>

                      <div className="row">
                      <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip04">State</label>
                          <input type="text" className="form-control" onChange={handleChange} name="state" id="validationTooltip04" placeholder="State" required />
                          <div className="invalid-tooltip">
                            Please provide a valid state.
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip03">City</label>
                          <input type="text" className="form-control" onChange={handleChange} name="city" id="validationTooltip03" placeholder="City" required />
                          <div className="invalid-tooltip">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip05">ZipCode</label>
                          <input type="text" className="form-control" onChange={handleChange} name="zipCode" id="validationTooltip05" placeholder="ZipCode" required />
                          <div className="invalid-tooltip">
                            Please provide a valid zip.
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary hapitjeter float-right" type="button" data-id="1">Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
     <Footer/>
    </>
  );
}

export default RegisterForClients;