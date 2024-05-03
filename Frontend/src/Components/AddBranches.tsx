import React, { useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { UserModel } from "../interfaces/users";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddBranches() {

  return (
    <>
      <h1 style={{ marginLeft: "15px" }}>Edit User</h1>
      <Segment clearing style={{ marginRight: "30px", marginTop: "30px", marginLeft: "10px" }}>
        <Form  autoComplete="off">
          <Form.Input
            placeholder="BranchName"
            name="branchName"
            id="branchName"
          />
          <Form.Input
            placeholder="adress"
            name="adress"
            id="adress"
          />
          <Form.Input
            placeholder="PhoneNumber"
            name="phoneNumber"
            id="phoneNumber"
          />
          <Form.Input
            placeholder="Openend"
            name="opened"
            id="opened"
          />
          <Button floated="right" positive type="submit" content="Submit" />
        </Form>
      </Segment>
    </>
  );
 }
