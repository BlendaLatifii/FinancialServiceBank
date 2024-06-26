import React, { useState, useEffect } from "react";
import $ from "jquery"; // Import jQuery
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";
import Header from "../Header";
import Footer from "../Footer";
import { SelectListItem } from "../../interfaces/select-list-item";
import { Form, Formik } from "formik";
import { Button, Segment } from "semantic-ui-react";
import MyTextInput from "../../FormElements/MyTextInput";
import { LoanModel } from "../../interfaces/loan-model";
import { LoanService } from "../../services/LoanService";
import { employmentStatus } from "../../interfaces/employmentStatus";
import { LoanType } from "../../interfaces/LoanType";

type Props = {};

export default function LoanForm({}: Props) {
  const { id } = useParams<{ id: string }>();
  const [typesOfLoans, setTypesOfLoans] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<LoanModel>({
    id: id!,
    clientAccountNumber: '',
    loansTypesId: 0,
    monthlyPayment: '',
    loanAmount: null,
    income: '',
    loanPeriod: '',
    employmentStatus: 0,
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
          loansTypesId: userData.loansTypesId,
          loanPeriod: userData.loanPeriod,
          monthlyPayment: userData.monthlyPayment,
          income: userData.income,
          employmentStatus: +userData.employmentStatus,
        } as LoanModel);
      }
    };

    fetchData();
  }, [id!]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    let model = values as LoanModel;
    console.log(model);
    await LoanService.EditOrAddLoan(model);
    navigate("/LoanTable");
  };
  const typeSelectList = Object.keys(employmentStatus)
    .map((key, i) => ({
      key: i,
      value: +i,
      text: employmentStatus[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);
    const loantypeSelectList = Object.keys(LoanType)
    .map((key, i) => ({
      key: i,
      value: +i,
      text: LoanType[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);

  const validation = yup.object<LoanModel>({
    clientAccountNumber: yup.string().required(),
    loanAmount: yup.string().required(),
    monthlyPayment: yup.string().required(),
    income: yup.string().required(),
    loanPeriod: yup.string().required(),
    loansTypesId:yup.string().required(),
    employmentStatus: yup.string().required(),
  });

  return (
    <>
      <Header />
      <h1 style={{ marginLeft: "15px" }}>
        {values.id != null ? "Edit" : "Add"} Loan
      </h1>
      <Segment
        clearing
        style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}
      >
        <Formik
          validationSchema={validation}
          enableReinitialize
          initialValues={values}
          onSubmit={(values) => handleSubmit()}
        >
          {({ handleSubmit, isSubmitting, dirty, isValid }) => (
            <Form
              className="ui form"
              style={{ backgroundColor: "#f5f6f7" }}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <MyTextInput
                fluid
                placeholder="Account Number"
                name="clientAccountNumber"
                onChange={handleChange}
              />
              <MyTextInput
                placeholder="Monthly Payment"
                name="monthlyPayment"
                onChange={handleChange}
              />
              <MyTextInput
                placeholder="Loan Amount"
                name="loanAmount"
                onChange={handleChange}
              />
              <MyTextInput
                placeholder="Income"
                name="income"
                onChange={handleChange}
              />
              <MyTextInput
                placeholder="Loan Period"
                name="loanPeriod"
                onChange={handleChange}
              />
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
              <Button
                floated="right"
                disabled={!isValid}
                positive
                type="submit"
                content="Submit"
              />
            </Form>
          )}
        </Formik>
      </Segment>
      <Footer />
    </>
  );
}
