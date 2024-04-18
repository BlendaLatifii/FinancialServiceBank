import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function EditUser(props: any) {
  const [user, setUser] = useState(props.user);

  function handleSubmit(e:any) {
    e.preventDefault();
    props.handleEditUser(user);
  }

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <>
      <h1 style={{ marginLeft: "15px" }}>Edit User</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Input
            placeholder="Username"
            value={user.username}
            name="username"
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Lastname"
            value={user.lastname}
            name="lastname"
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleInputChange}
          />
          <Button floated="right" positive type="submit" content="Submit" />
          <Button
            floated="right"
            type="button"
            content="Cancel"
            onClick={() => props.closeForm()}
          />
        </Form>
      </Segment>
    </>
  );
}
