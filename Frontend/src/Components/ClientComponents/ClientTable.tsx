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
import { Link, useNavigate } from "react-router-dom";
import { ClientModel } from "../../interfaces/client-model";
import { ClientService } from "../../services/ClientService";
import Header from "../Header";
import { StateOfClient } from "../../interfaces/StateOfClient";
import { CityOfClient } from "../../interfaces/CityOfClient";

export default function ClientTable() {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteClientId, setDeleteClientId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const result = await ClientService.GetAllClients();
        setClients(result);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setErrors('Failed to load clients. Please try again later.');
      }
  };

  function deleteClient(id: string) {
    setOpenConfirm(true);
    setDeleteClientId(id);
  }

    async function confirmedDeleteClient(id:string)
    {
      var result = await ClientService.DeleteClient(id!);
      setClients(clients.filter((client) => client.id!== id))
      setOpenConfirm(false);
      setDeleteClientId("");
    }

  function sendToDetails(id:string){
    navigate(`/RegisterForClients/${id}`)
  }

  function AddClient(){
    navigate(`/AddClient`)
  }
  return (
    <Fragment>
       <Header/>
      <div className="mt-5 d-flex align-items-center">
      <h1 style={{ marginLeft: "30px" }}>Clients</h1>
      <Button
                  type="button"
                  className="ui positive basic button ms-4"
                  onClick={() => AddClient()}
                >
                  Add New Client
                </Button>
        </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Personal Number</TableHeaderCell>
            <TableHeaderCell>Firstname</TableHeaderCell>
            <TableHeaderCell>Middlename</TableHeaderCell>
            <TableHeaderCell>Lastname</TableHeaderCell>
            <TableHeaderCell>Phone Number </TableHeaderCell>
            <TableHeaderCell>E-mail</TableHeaderCell>
            <TableHeaderCell>State</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>ZipCode</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.map((item) => (
            <TableRow key={item.id!}>
                <TableCell>{item.personalNumberId}</TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.middleName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.emailAddress}</TableCell>
              <TableCell>
                  {item.state === StateOfClient.Kosove ? "Kosove" : 
                   item.state === StateOfClient.Shqiperi ? "Shqiperi" :
                   item.state === StateOfClient.Maqedoni ? "Maqedoni" :''}
              </TableCell>
              <TableCell>
                  {item.city === CityOfClient.Prishtine ? "Prishtine" : 
                   item.city === CityOfClient.Peje ? "Peje" :
                   item.city === CityOfClient.Prizren ? "Prizren" :
                   item.city === CityOfClient.Gjakove ? "Gjakove" : 
                   item.city === CityOfClient.Gjilan ? "Gjilan" :
                   item.city === CityOfClient.Mitrovice ? "Mitrovice" :
                   item.city === CityOfClient.Shkoder ? "Shkoder" : 
                   item.city === CityOfClient.Shkup ? "Shkup" :
                   item.city === CityOfClient.Tirane ? "Tirane" :
                   item.city === CityOfClient.Vlore ? "Vlore" : ''}
              </TableCell>

              <TableCell>{item.zipCode}</TableCell>
              <TableCell>
                <Button  type="button"  className="btn ui green basic button" onClick={()=>sendToDetails(item.id!)}>Edit</Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteClient(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
             <Confirm
          open={openConfirm}
          onCancel={()=> setOpenConfirm(false)}
          onConfirm={()=> confirmedDeleteClient(deleteClientId)}
        />
        </TableBody>
      </Table>
    </Fragment>
  );
}
