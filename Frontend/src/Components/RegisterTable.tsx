import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Input } from "semantic-ui-react";
import { User } from "../interfaces/users";
import axios from 'axios';

export default function RegisterTable() {

    const [users,setUsers] = useState<User[]>([]);

    function editUser(){

    }
   useEffect(()=>{
    const fetchData = async () => {
      try {
        const result = await axios.put('https://localhost:7254/api/Users');
        setUsers(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
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
          {users.map((user: User) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.userName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
              <Table.Cell>
              <Button type="button" className="btn btn-success" secondary>
                    Edit
                  </Button>
              </Table.Cell>
              <Table.Cell>
                <Button type="button" className="btn btn-danger" negative >
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