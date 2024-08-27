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
  const [filteredUsers, setFilteredUsers] = useState<TransactionModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
      setFilteredUsers(
        transactions.filter((user) =>
          user.sourceClientBankAccount!.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm, transactions]);

  const fetchData = async () => {
      const result = await TransactionService.GetAllTransactions();
      setTransactions(result);
      setFilteredUsers(result);
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
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <input className="form-control me-2 "
        type="search" 
        placeholder="Search by SourceAccountNumber"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search"></input>
      </div>
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
            <TableHeaderCell>userName</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.map((item) => (
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
                {item.userName}
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
