import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TranType } from "../../interfaces/TranType";
import { TransactionModel } from "../../interfaces/transaction-model";
import Header from "../Header";
import Footer from "../Footer";
import { TransactionService } from "../../services/TransactionService";

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
  });

  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(false);
  const [transationTypes,setTransactionTypes] = useState([])

  const typeSelectList =  Object.keys(TranType).map((key,i) => ({
    key: i,
    value: +i,
    text: TranType[+key]
  })).filter(x=> x.text != '' && x.text != null);

  useEffect(() => {
    fetchData();
  }, []);

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
        navigate('/');
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} style={{ padding: "20px", margin: "20px" }}>
        <h2 style={{ padding: "5px", margin: "5px" }}>Transactions</h2>
        <div className="form-group">
          <label htmlFor="sourceClientBankAccount">Source Account:</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Not needed for Deposit transactions"
            className="form-control"
            id="sourceClientBankAccount"
            name="sourceClientBankAccount"
            value={formData.sourceClientBankAccount || ""}
            onChange={handleChange}
          />
        </div>
          <div className="form-group">
            <label htmlFor="destinationClientBankAccount">Receive Account:</label>
            <input
              style={{ padding: "5px", margin: "5px" }}
              type="text"
              placeholder="Not needed for WithDrawal transactions"
              className="form-control"
              id="destinationClientBankAccount"
              name="destinationClientBankAccount"
              value={formData.destinationClientBankAccount || ""}
              onChange={handleChange}
            />
          </div>
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
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "5px", margin: "5px" }}
        >
          Submit
        </button>
      </form>
      <Footer />
    </>
  );
}
