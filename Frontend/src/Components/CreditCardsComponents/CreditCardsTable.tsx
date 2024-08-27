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
import { CreditCardsModel } from "../../interfaces/creditCards-model";
import axios from "axios";
import { CreditCardsService } from "../../services/CreditCardsService";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

export default function CreditCardsTable() {
  const [creditCards, setCreditCards] = useState<CreditCardsModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<CreditCardsModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteCreditCardsId, setDeleteCreditCardsId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchData();
    setFilteredUsers(
      creditCards.filter((user) =>
        user.clientAccountNumber!.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, creditCards]);

  const fetchData = async () => {
    const result = await CreditCardsService.GetAllCreditCards();
    setCreditCards(result);
    setFilteredUsers(result);
  };
  function deleteCreditCards(id: string) {
    setOpenConfirm(true);
    setDeleteCreditCardsId(id);
  }

  async function confirmedDeleteCards(id: string) {
    var result = await CreditCardsService.DeleteCreditCards(id);
    setCreditCards(creditCards.filter((card) => card.id !== id));
    setOpenConfirm(false);
    setDeleteCreditCardsId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditCreditCards/${id}`);
  }

  function AddCreditCards() {
    navigate(`/AddCreditCards`);
  }

  return (
    <Fragment>
      <Header />
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Credit Cards</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddCreditCards()}
        >
          Add New Credit Cards
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <input className="form-control me-2 "
        type="search" 
        placeholder="Search by AccountNumber"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search"></input>
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>CVV</TableHeaderCell>
            <TableHeaderCell>Account Number</TableHeaderCell>
            <TableHeaderCell>Types Of Credit Card</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
            <TableHeaderCell>Limite</TableHeaderCell>
            <TableHeaderCell>ValidThru</TableHeaderCell>
            <TableHeaderCell>AddedBy</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.cvv}</TableCell>
              <TableCell>{item.clientAccountNumber}</TableCell>
              <TableCell>
                {item.typesOfCreditCardsID}
              </TableCell>
              <TableCell>{item.balance}</TableCell>
              <TableCell>{item.limite}</TableCell>
              <TableCell>{item.validThru}</TableCell>
              <TableCell>{item.userName}</TableCell>
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
                  onClick={() => deleteCreditCards(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteCards(deleteCreditCardsId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
