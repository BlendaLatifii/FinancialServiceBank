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
  Dropdown,
  Input,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { TransactionModel } from "../../interfaces/transaction-model";
import { TransactionService } from "../../services/TransactionService";
import { TranType } from "../../interfaces/TranType";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string>("");
  const [sourceAccountFilter, setSourceAccountFilter] = useState<string>("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<TranType | "">("");
  const navigate = useNavigate();
  const fetchData = async () => {
    const result = await TransactionService.GetAllTransactions();
    setTransactions(result);
    setFilteredTransactions(result);
  };

  function deleteTransaction(id: string) {
    setOpenConfirm(true);
    setDeleteTransactionId(id);
  }

  async function confirmedDeleteTransaction(id: string) {
    await TransactionService.DeleteTransaction(id);
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    setFilteredTransactions(filteredTransactions.filter((transaction) => transaction.id !== id));
    setOpenConfirm(false);
    setDeleteTransactionId("");
  }

  function sendToDetails(id: string | null) {
    navigate(`/EditTransaction/${id}`);
  }

  function AddTransaction() {
    navigate(`/AddTransaction`);
  }

  useEffect(() => {
    fetchData();
    const filtered = transactions.filter(
      (transaction) =>
        transaction.sourceClientBankAccount && 
      transaction.sourceClientBankAccount
          .toLowerCase()
          .includes(sourceAccountFilter.toLowerCase()) &&
        (transactionTypeFilter === "" ||
          transaction.transactionType === transactionTypeFilter)
    );
    setFilteredTransactions(filtered);
  }, [sourceAccountFilter, transactionTypeFilter, transactions]);

  
  const transactionTypeOptions = [
    { key: "transfer", text: "Transfer", value: TranType.Transfer },
    { key: "deposit", text: "Deposit", value: TranType.Deposit },
    { key: "withdrawal", text: "Withdrawal", value: TranType.WithDrawal },
  ];

  return (
    <Fragment>
      <Header />
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

      <div className="filters" style={{ margin: "20px" }}>
        <Input
          placeholder="Filter by Source Account Number"
          value={sourceAccountFilter}
          onChange={(e) => setSourceAccountFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Dropdown
          placeholder="Filter by Transaction Type"
          selection
          clearable
          options={transactionTypeOptions}
          value={transactionTypeFilter}
          onChange={(e, { value }) => setTransactionTypeFilter(value as TranType)}
        />
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
          {filteredTransactions.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sourceClientBankAccount}</TableCell>
              <TableCell>{item.destinationClientBankAccount}</TableCell>
              <TableCell>{item.transactionAmount}</TableCell>
              <TableCell>
                {item.transactionType === TranType.Deposit
                  ? "Deposit"
                  : item.transactionType === TranType.WithDrawal
                  ? "Withdrawal"
                  : item.transactionType === TranType.Transfer
                  ? "Transfer"
                  : ""}
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
              <TableCell>{item.userName}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  className="btn ui green basic button"
                  onClick={() => sendToDetails(item.id!)}
                >
                  Edit
                </Button>
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
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteTransaction(deleteTransactionId)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}