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
import { ClientBankAccountModel } from "../../interfaces/clientaccount-model";
import axios from "axios";
import { ClientBankAccountService } from "../../services/ClientBankAccountService";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

export default function ClientAccountTable() {
  const [users, setUsers] = useState<ClientBankAccountModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ClientBankAccountModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    setFilteredUsers(
      users.filter((user) =>
        user.personalNumber!.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);
  

  const fetchData = async () => {
    const result = await ClientBankAccountService.GetAllBankAcc();
    setUsers(result);
    setFilteredUsers(result);
  };
  function deleteUser(id: string) {
    setOpenConfirm(true);
    setDeleteUserId(id);
  }

  async function confirmedDeleteUser(id: string) {
    var result = await ClientBankAccountService.DeleteBankAcc(id);
    setUsers(users.filter((user) => user.id !== id));
    setOpenConfirm(false);
    setDeleteUserId("");
  }

  function sendToDetails(id: string | null) {
    navigate(`/EditClientAccount/${id}`);
  }

  function AddClientAccount() {
    navigate(`/AddClientAccount`);
  }

  return (
    <Fragment>
      <Header />
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>ClientBankAccount</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddClientAccount()}
        >
          Add New ClientBankAccount
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <input className="form-control me-2 "
        type="search" 
        placeholder="Search by PersonalNumber"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search"></input>
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Account Number</TableHeaderCell>
            <TableHeaderCell>Username</TableHeaderCell>
            <TableHeaderCell>Personal Number</TableHeaderCell>
            <TableHeaderCell>Current Balance</TableHeaderCell>
            <TableHeaderCell>Date Created</TableHeaderCell>
            <TableHeaderCell>Date Updated</TableHeaderCell>
            <TableHeaderCell>BankAccount Type</TableHeaderCell>
            <TableHeaderCell>Branch</TableHeaderCell>
            <TableHeaderCell>AddedBy</TableHeaderCell>
            <TableHeaderCell>UpdatedBy</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
        {filteredUsers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.accountNumberGeneratedID}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.personalNumber}</TableCell>
              <TableCell>{item.currentBalance}</TableCell>
              <TableCell>
                {item.dateCreated != null
                  ? new Date(item.dateCreated).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                {item.dateLastUpdated != null
                  ? new Date(item.dateLastUpdated).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>{item.bankAccountId}</TableCell>
              <TableCell>{item.branchId}</TableCell>
              <TableCell>{item.createdByUserId}</TableCell>
              <TableCell>{item.lastUpdatedByUserId}</TableCell>
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
                  onClick={() => deleteUser(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteUser(deleteUserId)}
          />
          </TableBody>
      </Table>
    </Fragment>
  );
}
