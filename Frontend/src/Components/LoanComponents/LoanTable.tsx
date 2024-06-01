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
import { LoanModel } from "../../interfaces/loan-model";
import { LoanService } from "../../services/LoanService";

export default function TransactionTable() {
  const [loans, setLoans] = useState<LoanModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteLoanId, setDeleteLoanId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await LoanService.GetAllLoans();
      setLoans(result);
  };

  function deleteLoan(id: string) {
    setOpenConfirm(true);
    setDeleteLoanId(id);
  }

    async function confirmedDeleteLoan(id:string)
    {
      var result = await LoanService.DeleteLoan(id);
      setLoans(loans.filter((loan) => loan.id !== id))
      setOpenConfirm(false);
      setDeleteLoanId("");
    }

  function sendToDetails(id:string | null){
    navigate(`/EditLoan/${id}`)
  }

  function AddLoan(){
    navigate(`/AddLoan`)
  }



  return (
    <Fragment>
       <Header/>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Loans</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddLoan()}
                >
                  Add New Loan
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>clientAccountNumber</TableHeaderCell>
            <TableHeaderCell>loanType</TableHeaderCell>
            <TableHeaderCell>monthlyPayment</TableHeaderCell>
            <TableHeaderCell>income</TableHeaderCell>
            <TableHeaderCell>loanInstallment</TableHeaderCell>
            <TableHeaderCell>interestRate</TableHeaderCell>
            <TableHeaderCell>loanPeriod</TableHeaderCell>
            <TableHeaderCell>emplymentStatus</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loans.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.clientAccountNumber}</TableCell>
              <TableCell>{item.loansTypeId}</TableCell>
              <TableCell>{item.monthlyPayment}</TableCell>
              <TableCell>{item.income}</TableCell>
              <TableCell>{item.loanInstallment}</TableCell>
              <TableCell>{item.interestRate}</TableCell>
              <TableCell>{item.loanPeriod}</TableCell>
              <TableCell>{item.employmentStatus}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteLoan(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteLoan(deleteLoanId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
