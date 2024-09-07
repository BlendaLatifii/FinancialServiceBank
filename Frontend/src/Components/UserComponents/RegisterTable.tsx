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
import { UserModel } from "../../interfaces/users";
import axios from "axios";
import { UserService } from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

export default function RegisterTable() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
    setFilteredUsers(
      users.filter((user) =>
        user.personalNumberId!.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const fetchData = async () => {
      const result = await UserService.GetAllUsers();
      setUsers(result);
      setFilteredUsers(result);
  };

  function deleteUser(id: string) {
    setOpenConfirm(true);
    setDeleteUserId(id);
  }

    async function confirmedDeleteUser(id:string)
    {
      var result = await UserService.DeleteUser(id);
      setUsers(users.filter((user) => user.id !== id))
      setOpenConfirm(false);
      setDeleteUserId("");
    }

  function sendToDetails(id:string | null){
    navigate(`/EditUser/${id}`)
  }

  function AddUser(){
    navigate(`/AddUser`)
  }



  return (
    <Fragment>
       <Header/>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Users</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddUser()}
                >
                  Add New User
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
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Lastname</TableHeaderCell>
            <TableHeaderCell>E-mail</TableHeaderCell>
            <TableHeaderCell>MiddleName</TableHeaderCell>
            <TableHeaderCell>PersonalNumber</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.middleName}</TableCell>
              <TableCell>{item.personalNumberId}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
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
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteUser(deleteUserId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
