import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';


function RegisterForClients() {

  return (
    <>
    <Header/>
      <div className="container">
        <div className="row">
          <form className="needs-validation" noValidate>
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
                          <label htmlFor="validationTooltip01">FirstName</label>
                          <input type="text" className="form-control" name="firstName" id="validationTooltip01" placeholder="Client's FirstName"required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">MiddleName</label>
                          <input type="text" className="form-control" name="middlename" id="validationTooltip01" placeholder="Client's MiddleName" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip01">Surname</label>
                          <input type="text" className="form-control" name="surname" id="validationTooltip02" placeholder="Client's Surname" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">Personal Number</label>
                          <input type="text" className="form-control" name="mbiemri" id="validationTooltip02" placeholder="Client's Personal Number" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltipUsername">BirthDate</label>
                          <div className="input-group">
                            <input type="date" className="form-control" name="birthdate" id="validationTooltipUsername" placeholder="birthdate" aria-describedby="validationTooltipUsernamePrepend" required />
                            <div className="invalid-tooltip">
                              Please choose a unique and valid username.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip02">PhoneNumber</label>
                          <input type="tel" className="form-control" name="tel" id="validationTooltip02" placeholder="Client's PhoneNumber" required />
                          <div className="valid-tooltip">
                            Looks good!
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="validationTooltipUsername">Email-Address</label>
                        <input type="text" className="form-control" name="emailAdress" id="validationTooltipUsername" placeholder="Email-Address" aria-describedby="validationTooltipUsernamePrepend" required />
                        <div className="invalid-tooltip">
                          Please choose a unique and valid username.
                        </div>
                      </div>

                      <div className="row">
                      <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip04">State</label>
                          <input type="text" className="form-control" name="state" id="validationTooltip04" placeholder="State" required />
                          <div className="invalid-tooltip">
                            Please provide a valid state.
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationTooltip03">City</label>
                          <input type="text" className="form-control" name="city" id="validationTooltip03" placeholder="City" required />
                          <div className="invalid-tooltip">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationTooltip05">ZipCode</label>
                          <input type="text" className="form-control" name="zipCode" id="validationTooltip05" placeholder="ZipCode" required />
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