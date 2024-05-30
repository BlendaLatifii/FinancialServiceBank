import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Confirm,
} from "semantic-ui-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { TransactionModel } from "../../interfaces/transaction-model";
import { TransactionService } from "../../services/TransactionService";
import { TranType } from "../../interfaces/TranType";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await TransactionService.GetAllTransactions();
      setTransactions(result);
  };

  function deleteTransaction(id: string) {
    setOpenConfirm(true);
    setDeleteTransactionId(id);
  }

    async function confirmedDeleteTransaction(id:string)
    {
      var result = await TransactionService.DeleteTransaction(id);
      setTransactions(transactions.filter((transaction) => transaction.id !== id))
      setOpenConfirm(false);
      setDeleteTransactionId("");
    }

  function sendToDetails(id:string | null){
    navigate(`/EditTransaction/${id}`)
  }

  function AddTransaction(){
    navigate(`/AddTransaction`)
  }



  return (
    <Fragment>
       <Header/>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Transactions</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddTransaction()}
                >
                  Add New Transaction
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>sourceClientBankAccount</TableHeaderCell>
            <TableHeaderCell>destinationClientBankAccount</TableHeaderCell>
            <TableHeaderCell>transactionAmount</TableHeaderCell>
            <TableHeaderCell>transactionType</TableHeaderCell>
            <TableHeaderCell>transactionDate</TableHeaderCell>
            <TableHeaderCell>transactionDateUpdated</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sourceClientBankAccount}</TableCell>
              <TableCell>{item.destinationClientBankAccount}</TableCell>
              <TableCell>{item.transactionAmount}</TableCell>
              <TableCell>
                  {item.transactionType === TranType.Deposit ? "Deposit" : 
                   item.transactionType === TranType.WithDrawal ? "Withdrawal" :
                   item.transactionType === TranType.Transfer ? "Transfer" : ""}
              </TableCell>
              <TableCell>
                {item.transactionDate != null
                  ? new Date(item.transactionDate).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                {item.transactionDateUpdated != null
                  ? new Date(item.transactionDateUpdated).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteTransaction(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteTransaction(deleteTransactionId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
