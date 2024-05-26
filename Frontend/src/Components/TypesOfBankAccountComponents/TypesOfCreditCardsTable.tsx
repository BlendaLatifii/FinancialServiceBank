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
import { TypesOfCreditCardsModel } from "../../interfaces/TypesOfCreditCards-model";
import axios from "axios";
import { TypesOfCreditCardsService } from "../../services/TypesOfCreditCardsService";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

export default function TypesOfCreditCardsTable() {
  const [type, setType] = useState<TypesOfCreditCardsModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteTypeId, setDeleteTypeId] = useState<string>("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await TypesOfCreditCardsService.GetAllTypes();
    setType(result);
  };
  function deleteType(id: string) {
    setOpenConfirm(true);
    setDeleteTypeId(id);
  }

  async function confirmedDeleteType(id: string) {
    var result = await TypesOfCreditCardsService.DeleteType(id);
    setType(type.filter((types) => types.id !== id));
    setOpenConfirm(false);
    setDeleteTypeId("");
  }

  function sendToDetails(id: string | null) {
    navigate(`/EditTypesOfCreditCards/${id}`);
  }

  function AddTypes() {
    navigate(`/AddTypesOfCreditCards`);
  }

  return (
    <Fragment>
      <Header />
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Type Of Credit Cards</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddTypes()}
        >
          Add New Types
        </Button>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {type.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Button type="button" className="btn ui green basic button" onClick={() => sendToDetails(item.id!)}>
                   Edit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteType(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteType(deleteTypeId)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}