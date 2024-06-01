import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ListItemModel } from '../interfaces/list-item-model';
import { BankAccountService } from '../services/BankAccountService';
import { SelectListItem } from '../interfaces/select-list-item';
import { ClientBankAccountModel } from '../interfaces/clientaccount-model';
import axios from 'axios';
import { ClientService } from '../services/ClientService';
import { ClientModel } from '../interfaces/client-model';

export default function RegisterForClients() {
  const { id } = useParams<{ id: string}>();
  const [formData, setFormData] = useState<ClientModel>({
    id:null,
    personalNumberId:'',
    firstName: '',
    middleName: '',
    lastName:'',
    phoneNumber:'',
    emailAddress: '',
    state:'',
    city:'',
    zipCode: ''
  });

  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
      if(id!=null){
     const response = await ClientService.GetClientDetails(id!);
     const userData = response;
     setFormData({
       id: userData.id,
       personalNumberId: userData.personalNumberId,
       firstName: userData.firstName,
       middleName: userData.middleName,
       lastName: userData.lastName,
       phoneNumber:userData.phoneNumber,
       emailAddress:userData.emailAddress,
       state:userData.state,
       city:userData.city,
       zipCode:userData.zipCode,
     }as ClientModel);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let model = {
        id: formData.id,
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
      const response = await axios.post(`https://localhost:7254/api/Client`,model);
       setRegistered(true);
      navigate("/EditClientAccount");
    } catch (error) {
      console.error('Error creating account :', error);
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
                      <button data-id="1" className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><span><h3>Client's Information</h3></span></button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" data-id="1" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">Personal Number</label>
                          <input type="text" className="form-control" onChange={handleChange} name="personalNumberId"
                           id="personalNumberId" placeholder="Client's PersonalNumber" value={formData.personalNumberId || ''} required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">FirstName</label>
                          <input type="text" className="form-control" onChange={handleChange} name="firstName" value={formData.firstName || ''}
                           id="firstName" placeholder="FirstName" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">Middlename</label>
                          <input type="text" className="form-control" onChange={handleChange} name="middleName" value={formData.middleName || ''}
                           id="middleName" placeholder="MiddleName" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">LastName</label>
                          <input type="text" className="form-control" onChange={handleChange} name="lastName" value={formData.lastName || ''} 
                          id="lastName" placeholder="LastName" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">PhoneNumber</label>
                          <input type="tel" className="form-control" onChange={handleChange} name="phoneNumber" 
                          value={formData.phoneNumber || ''} id="phoneNumber" placeholder="PhoneNumber" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="validationTooltipUsername">Email-Address</label>
                        <input type="text" className="form-control" onChange={handleChange} name="emailAddress"
                        value={formData.emailAddress || ''} id="emailAddress" placeholder="Email-Address" aria-describedby="validationTooltipUsernamePrepend" required />
                        <div className="invalid-tooltip">
                          Please choose a unique and valid username.
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip04">State</label>
                          <input type="text" className="form-control" onChange={handleChange} name="state" 
                          value={formData.state || ''} id="state" placeholder="State" required />
                          <div className="invalid-tooltip">
                            Please provide a valid state.
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip03">City</label>
                          <input type="text" className="form-control" onChange={handleChange} name="city"
                          value={formData.city || ''} id="city" placeholder="City" required />
                          <div className="invalid-tooltip">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip05">ZipCode</label>
                          <input type="text" className="form-control" onChange={handleChange} name="zipCode"
                          value={formData.zipCode || ''} id="zipCode" placeholder="ZipCode" required />
                          <div className="invalid-tooltip">
                            Please provide a valid zip.
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary hapitjeter float-right " type="submit" data-id="1" style={{backgroundColor:'green' , borderColor:'green'}}>Register</button>
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
