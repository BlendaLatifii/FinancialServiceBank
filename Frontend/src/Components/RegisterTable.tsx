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
} from "semantic-ui-react";
import { UserModel } from "../interfaces/users";
import axios from "axios";
import { UserService } from "../services/UsersService";
import { ConfirmDialog } from "./ConfirmationDialog";

export default function RegisterTable() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false)

  function editUser() {}
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("https://localhost:7254/api/Users");
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function deleteUser(id: string) {
    setOpenConfirm(true);
  }

    async function confirmedDeleteUser(id:string)
    {
      var result = await UserService.DeleteUser(id);
      setUsers(users.filter((user) => user.id !== id))
    }

  return (
    <Fragment>
      <h1 style={{ marginLeft: "30px" }}>Users</h1>

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
                {" "}
                <Button type="button" className="btn btn-success" secondary>
                  Edit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => item.id && deleteUser(item.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <ConfirmDialog
        open={openConfirm}
        setOpen={()=>setOpenConfirm}
        onConfirm={()=>confirmedDeleteUser('44')}
      />
      </Table>
    </Fragment>
  );
}
