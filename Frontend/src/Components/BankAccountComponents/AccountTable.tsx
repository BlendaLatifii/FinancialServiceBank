import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Confirm,
} from "semantic-ui-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { number } from "yup";
import { BankAccountModel } from "../../interfaces/bankAcc-model";
import { BankAccountService } from "../../services/BankAccountService";
import Header from "../Header";

export default function AccountTable() {
  const [accounts, setAccounts] = useState<BankAccountModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteAccountId, setDeleteAccountId] = useState<string>("");
  const [errors, setErrors] = useState({});

  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await BankAccountService.GetAllBankAcc();
      setAccounts(result);
  }

  function deleteAccount(id:string) {
    setOpenConfirm(true);
    setDeleteAccountId(id);
  }
    async function confirmedDeleteAccount(id:string)
     {
      var result = await BankAccountService.DeleteBankAcc(id);
      setAccounts(accounts.filter((account) => account.id !== id))
      setOpenConfirm(false);
      setDeleteAccountId("");
     }

  function sendToDetails(id:string ){
    navigate(`/EditBankAccount/${id}`)
  }

  function AddAccounts(){
    navigate(`/AddBankAccount`)
  }

  return (
    <Fragment>
       <Header/>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Bank Account</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddAccounts()}
                >
                  Add New Account
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Account Type</TableHeaderCell>
            <TableHeaderCell>Account Description</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {accounts.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.accountDescription}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteAccount(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteAccount(deleteAccountId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
