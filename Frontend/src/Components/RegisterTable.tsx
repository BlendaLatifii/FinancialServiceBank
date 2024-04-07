import React, { Fragment } from "react";
import { Table, Button, Input } from "semantic-ui-react";
import EditUser from "./EditUser";
import { User } from "../interfaces/users";

export default function RegisterTable(props: 
  { 
    users:User[];
   deleteUser: (arg0: React.Key | null | undefined) => void;
   registerUser: () => void;
   }) {
  return (
    <Fragment>
      <h1 style={{ marginLeft: "30px" }}>User Registration</h1>
      <Table
        celled
        style={{
          marginLeft: "30px",
          marginTop: "30px",
          width: "1100px",
          border: "1px solid black",
        }}

      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Lastname</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Password</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map((user: User) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.lastname}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
              <Table.Cell>
              <Button type="button" className="btn btn-success" secondary onClick={() => EditUser(user)}>
                    Edit
                  </Button>
              </Table.Cell>
              <Table.Cell>
                <Button type="button" className="btn btn-danger" negative onClick={() => props.deleteUser(user.id)}>
                  {" "}
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
}