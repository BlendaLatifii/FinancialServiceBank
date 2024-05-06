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
import { BankAccountModel } from "../interfaces/bankAcc-model";
import axios from "axios";
import { BankAccountService } from "../services/BankAccountService";
import { Link, useNavigate } from "react-router-dom";

export default function AccountTable() {
  const [bankAcc, setBankAcc] = useState<BankAccountModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteBankAccId, setDeleteBankAccId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await BankAccountService.GetAllBankAcc();
      setBankAcc(result);
  };

  function DeleteAcc(id: string) {
    setOpenConfirm(true);
    setDeleteBankAccId(id);
  }

    async function confirmedDeleteBankAcc(id:string)
    {
      var result = await BankAccountService.DeleteBankAcc(id);
      setBankAcc(bankAcc.filter((bankAcc) => bankAcc.id !== id))
      setOpenConfirm(false);
      setDeleteBankAccId("");
    }

  function sendToDetails(id:string| null){
    navigate(`/EditBankAccount/${id}`)
  }

  function AddBankAccount(){
    navigate(`/EditBankAccount`)
  }



  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>BankAccount</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddBankAccount()}
                >
                  Add New BankAccount
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
          {bankAcc.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.accountDescription}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => DeleteAcc(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteBankAcc(deleteBankAccId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
