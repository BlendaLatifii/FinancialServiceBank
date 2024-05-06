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
import { BranchModel } from "../../interfaces/branch-model";
import axios from "axios";
import { BranchService } from "../../services/BranchService";
import { Link, useNavigate } from "react-router-dom";
import { number } from "yup";

export default function BranchTable() {
  const [branches, setBranches] = useState<BranchModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteBranchId, setDeleteBranchId] = useState<string>("");
  const [errors, setErrors] = useState({});

  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await BranchService.GetAllBranches();
      setBranches(result);
  }

  function deleteBranch(branchId:string) {
    setOpenConfirm(true);
    setDeleteBranchId(branchId);
  }
    async function confirmedDeleteBranch(branchId:string)
     {
      var result = await BranchService.DeleteBranch(branchId);
      setBranches(branches.filter((branch) => branch.branchId !== branchId))
      setOpenConfirm(false);
      setDeleteBranchId("");
     }

  function sendToDetails(branchId:string ){
    navigate(`/EditBranch/${branchId}`)
  }

  function AddBranches(){
    navigate(`/AddBranches`)
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Branch</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddBranches()}
                >
                  Add New Branch
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>BranchName</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>PhoneNumber</TableHeaderCell>
            <TableHeaderCell>Opened</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {branches.map((item) => (
            <TableRow key={item.branchId}>
              <TableCell>{item.branchName}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.opened}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.branchId!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteBranch(item.branchId!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteBranch(deleteBranchId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
