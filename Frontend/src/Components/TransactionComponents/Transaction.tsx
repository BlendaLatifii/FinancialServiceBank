import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TranType } from "../../interfaces/TranType";
import { TransactionModel } from "../../interfaces/transaction-model";
import Header from "../Header";
import Footer from "../Footer";
import { TransactionService } from "../../services/TransactionService";
import { SelectListItem } from "../../interfaces/select-list-item";
import { ClientBankAccountService } from "../../services/ClientBankAccountService";
import { Segment } from "semantic-ui-react";
import { AuthService } from "../../services/AuthService";

export default function Transaction() {
  const { id } = useParams<{ id: string}>();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<TransactionModel>({
    id: null,
    transactionAmount: 23,
    sourceClientBankAccountId: null,
    destinationClientBankAccountId: null,
    sourceClientBankAccount: "",
    destinationClientBankAccount: "",
    transactionType: 0, 
    transactionDate: null,
    transactionDateUpdated: null,
  } as TransactionModel);

  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(false);
  const [accountTypeSelectList, setAccountTypeSelectList] = useState<SelectListItem[]>([]);

  const typeSelectList =  Object.keys(TranType).map((key,i) => ({
    key: i,
    value: +i,
    text: TranType[+key]
  })).filter(x=> x.text != '' && x.text != null);

  const fetchAccountTypes = async () => {
    try {
      const response = await ClientBankAccountService.GetSelectList(); 
      setAccountTypeSelectList(response.map((item,i) => ({
        key: i,
        value: item.name,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

      // setFormData({
      //   ...formData,
      //   sourceClientBankAccount : response[0]?.name,
      //   destinationClientBankAccount : response[0]?.name
      // })

      
    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };
  useEffect(()=>{
    fetchData();
    fetchAccountTypes();
  },[])
  
 function initializeAccountIds(){
  setTimeout(()=>{
    console.log('test',accountTypeSelectList,accountTypeSelectList[0]?.value)
    setFormData({
      ...formData,
      sourceClientBankAccount : accountTypeSelectList[0]?.value,
      destinationClientBankAccount : accountTypeSelectList[0]?.value
    })
  },30000)
  }


  const fetchData = async () => {
     if(id != null){
      const response = await TransactionService.GetTransactionDetails(id!);
      const userData = response;
      console.log(userData);
      setFormData({
        id: userData.id,
        sourceClientBankAccount: userData.sourceClientBankAccount,
        destinationClientBankAccount: userData.destinationClientBankAccount,
        transactionAmount: userData.transactionAmount,
        transactionType: userData.transactionType,
      }as TransactionModel);
     }
   };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let model = {
        id: formData.id,
        sourceClientBankAccount: formData.sourceClientBankAccount,
        destinationClientBankAccount: formData.destinationClientBankAccount,
        transactionAmount: formData.transactionAmount,
        transactionType: +formData.transactionType,
      } as TransactionModel;

      const response = await axios.post(
        "https://localhost:7254/api/Transaction",
        model
      );
      setTransaction(true);
      sendToOverview();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  const isAdmin = AuthService.GetUserRole() === 'Admin';
  function sendToOverview(){
    if(isAdmin){
      navigate('/TransactionTable');
    } else{
      navigate('/');
    }
  }
  return (
    <>
      <Header />
      <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {formData.id != null ? 'Edit' : 'Add'} Transaction
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {formData.id != null ? 'edit' : 'create'} a transaction.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
      <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
      
        
          <label htmlFor="sourceClientBankAccount">Source Account:</label>
          <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="sourceClientBankAccount"
            name="sourceClientBankAccount"
            value={formData.sourceClientBankAccount!}
            onChange={handleChange}
          >
            <option value="" disabled>Select Source Account</option>
            {accountTypeSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>

          <label htmlFor="destinationClientBankAccount">Receive Account:</label>
         {isAdmin && <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="destinationClientBankAccount"
            name="destinationClientBankAccount"
            value={formData.destinationClientBankAccount!}
            onChange={handleChange}
          >
            <option value="" disabled>Select Receive Account</option>
            {accountTypeSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>}
          {!isAdmin && 
            <div className="form-group">
            <input
              style={{ padding: "5px", margin: "5px" }}
              type="text"
              placeholder="Not needed for WithDrawal transactions"
              className="form-control"
              id="destinationClientBankAccount"
              name="destinationClientBankAccount"
              value={formData.destinationClientBankAccount!}
              onChange={handleChange}
            />
          </div> }
        <div className="form-group">
          <label htmlFor="transactionAmount">Transaction Amount:</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            className="form-control"
            id="transactionAmount"
            name="transactionAmount"
            value={formData.transactionAmount!}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="transactionType"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            {typeSelectList.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="submit"
           onClick={sendToOverview}
           className="ui blue basic button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
          >
          Cancel
        </button>
        <button
          type="submit"
          className="ui green button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
        >
          Submit
        </button>
        </div>
      </form>
      </Segment>
      <br/>
      <br/>
      <Footer />
    </>
  );
}
