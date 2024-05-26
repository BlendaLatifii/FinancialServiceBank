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
import Header from "../Header";
import { LoansTypeModel } from "../../interfaces/loanstype-model";
import { LoansTypeService } from "../../services/LoansTypeService";

export default function LoansTypeTable() {
  const [loans, setLoans] = useState<LoansTypeModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteLoansId, setDeleteLoansId] = useState<string>("");
  const [errors, setErrors] = useState({});

  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await LoansTypeService.GetAllLoansType();
      setLoans(result);
  }

  function deleteLoans(id:string) {
    setOpenConfirm(true);
    setDeleteLoansId(id);
  }
  async function confirmedDeleteAccount(id:string) {
    await LoansTypeService.DeleteLoansType(id);
    setLoans(loans.filter((loan) => loan.id !== id));
    setOpenConfirm(false);
    setDeleteLoansId("");
  }

  function sendToDetails(id:string ){
    navigate(`/EditLoansType/${id}`)
  }

  function AddLoanType(){
    navigate(`/AddLoanType`)
  }

  return (
    <Fragment>
       <Header/>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Loans Type</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddLoanType()}
                >
                  Add New Loan Type
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Loan Type</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loans.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.loanType}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteLoans(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteAccount(deleteLoansId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
