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

export default function RegisterTable() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await UserService.GetAllUsers();
      setUsers(result);
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
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Users</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddUser()}
                >
                  Add New User
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Lastname</TableHeaderCell>
            <TableHeaderCell>E-mail</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
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
