import React, { Fragment, useEffect, useState } from "react";
import { ContactUsModel } from "../interfaces/contactUs-model";
import axios from "axios";
import {
    Table,
    Button,
    Input,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Modal,
    ModalDescription,
    ModalContent,
    ModalActions,
    ModalHeader,
    Header,
    Confirm,
  } from "semantic-ui-react";
export default function ContactUsTable() {
  const [contact, setContacts] = useState<ContactUsModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteContactId, setDeleteContactId] = useState<number>();


    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const result = await axios.get("https://localhost:7254/api/ContactUs");
          setContacts(result.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      function deleteContact(id: number) {
        setOpenConfirm(true);
        setDeleteContactId(id);
      }
    
        async function confirmedDeleteContact(id:number)
        {
          var result = await axios.delete(`https://localhost:7254/api/ContactUs/${id}`);
          setContacts(contact.filter((contact) => contact.id !== id))
          setOpenConfirm(false);
          setDeleteContactId(undefined);
        }

      return (
        <Fragment>
          <h1 style={{ marginLeft: "30px" }}>Contacts</h1>
    
          <Table striped>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>E-mail</TableHeaderCell>
                <TableHeaderCell>Subject</TableHeaderCell>
                <TableHeaderCell>Message</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
    
            <TableBody>
              {contact.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      type="button"
                      className="btn btn-danger"
                      negative
                     onClick={() => deleteContact(item.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
             <Confirm
              open={openConfirm}
              onCancel={()=> setOpenConfirm(false)}
              onConfirm={()=> deleteContactId && confirmedDeleteContact(deleteContactId)}
            /> 
            </TableBody>
          </Table>
        </Fragment>
      );
}