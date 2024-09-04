import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Formik } from "formik";
import { Button, Segment } from "semantic-ui-react";
import MyTextInput from "../../FormElements/MyTextInput";
import { LoanModel } from "../../interfaces/loan-model";
import { LoanService } from "../../services/LoanService";
import { employmentStatus } from "../../interfaces/employmentStatus";
import { loanType } from "../../interfaces/LoanType";
export default function LoanForm() {
  const { id } = useParams<{ id: string }>();
  const [values, setValues] = useState<LoanModel>({
    id: id!,
    clientAccountNumber: '',
    loansTypesId: loanType.Kredi_Konsumuese,
    loanAmount: null,
    income: '',
    employmentStatus: employmentStatus.i_pa_pune,
  } as LoanModel);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (id != null) {
        const response = await LoanService.GetLoanDetails(id!);
        const userData = response;
        setValues({
          id: userData.id!,
          clientAccountNumber: userData.clientAccountNumber,
          loanAmount: userData.loanAmount,
          loansTypesId: userData.loansTypesId?? loanType.Kredi_Konsumuese,
          income: userData.income,
          employmentStatus: userData.employmentStatus?? employmentStatus.i_pa_pune,
        } as LoanModel);
      }
    };

    fetchData();
  }, [id!]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: name === "loansTypesId" || name === "employmentStatus" ? parseInt(value) : value });
  };

  const handleSubmit = async (model:LoanModel) => {
    await LoanService.EditOrAddLoan(model);
    sendToOverview();
  };
  function sendToOverview(){
    navigate("/HomePage");
  }
  const typeSelectList = Object.keys(employmentStatus)
    .map((key, i) => ({
      key: i,
      value: i,
      text: employmentStatus[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);
    
    const loantypeSelectList = Object.keys(loanType)
    .map((key, i) => ({
      key: i,
      value: i,
      text: loanType[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);

    
  const validation = yup.object<LoanModel>({
    clientAccountNumber: yup.string().required(),
    loanAmount: yup.string().required(),
    income: yup.string().required()
  });

  return (
    <>
      <Header />
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Loan
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Loan.
      </p>
      <Segment
         clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}
      >
        <Formik

          validationSchema={validation}
          enableReinitialize
          initialValues={values}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleSubmit, isSubmitting, dirty, isValid }) => (
            <Form
             className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off"
            >
              <MyTextInput
                fluid
                label={<label> AccountNumber</label>}
                placeholder="Account Number"
                name="clientAccountNumber"
                onChange={handleChange}
              />
              <MyTextInput
                label={<label><i className="fas fa-dollar-sign"></i> Loan Amount</label>}
                placeholder="Loan Amount"
                name="loanAmount"
                onChange={handleChange}
              />
              <MyTextInput
                label={<label><i className="fas fa-dollar-sign"></i> Income</label>}
                placeholder="Income"
                name="income"
                onChange={handleChange}
              />
              <div className="col-md-6-w-100%">
          <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="loansTypesId"
            name="loansTypesId"
            value={values.loansTypesId!}
            onChange={handleChange}
          >
            {loantypeSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
          </div>
          <div className="col-md-6-w-100%">
          <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="employmentStatus"
            name="employmentStatus"
            value={values.employmentStatus!}
            onChange={handleChange}
          >
            {typeSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
          </div>
          <Button floated="right" disabled={!isValid}  positive type="submit" content="Submit" style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }} />
          <Button floated="right" onClick={sendToOverview} className="ui blue basic button">Cancel</Button>
            </Form>
          )}
        </Formik>
      </Segment>
      <br/>
      <br/>
      <Footer />
    </>
  );
}
