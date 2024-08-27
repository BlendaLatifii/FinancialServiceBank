import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { TypesOfCreditCardsService } from '../../services/TypesOfCreditCardsService';
import { CreditCardsModel } from '../../interfaces/creditCards-model';
import { CreditCardsService } from '../../services/CreditCardsService';
import { SelectListItemInt } from '../../interfaces/select-list-itemInt';
import { SelectListItem } from '../../interfaces/select-list-item';
import { Segment } from 'semantic-ui-react';

export default function EditCreditCards() {
  const { id } = useParams<{ id: string}>();
  const [typesOfCreditCards, setTypesOfCreditCards] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<CreditCardsModel>({
    id:id!,
    clientAccountNumber: '',
    typesOfCreditCardsID: '',
    limite:null,
  } as CreditCardsModel);

  const navigate = useNavigate();
  const [creditCards, setCreditCards] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await CreditCardsService.GetCreditCardsDetails(id!);
     const userData = response;
     setValues({
       id: userData.id!,
       clientAccountNumber: userData.clientAccountNumber,
       typesOfCreditCardsID: userData.typesOfCreditCardsID,
       limite:userData.limite,
     }as CreditCardsModel);
    }
  };
  
  fetchData();

}, [id!]);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: values.id,
      clientAccountNumber: values.clientAccountNumber,
      limite: values.limite,
      typesOfCreditCardsID: values.typesOfCreditCardsID,
    } as CreditCardsModel;

    const response = await axios.post(
      "https://localhost:7254/api/CreditCards",
      model
    );
    setCreditCards(true);
    sendToOverview();
  } catch (error) {
    console.error("Error creating creditCards:", error);
  }
};
function sendToOverview(){
  navigate('/CreditCardsTable');
 }
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};


 const fetchCreditCardsTypes = async () => {
  try {
    const response = await TypesOfCreditCardsService.GetSelectList();
    setTypesOfCreditCards(response.map((item,i) => ({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=> x.text != '' && x.text != null));
  } catch (error) {
    console.error('Error fetching account types:', error);
  }
}

  useEffect(() => {
    fetchCreditCardsTypes();
  }, []);

  return (
    <>  
    <Header/>
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Credit Cards
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Credit Cards.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>Account Number</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder=" Account Number"
            className="form-control"
            id="clientAccountNumber"
            name="clientAccountNumber"
            value={values.clientAccountNumber!}
            onChange={handleChange}
          />
        </div>
          <div className="form-group">
          <label>Limite</label>
            <input
              style={{ padding: "5px", margin: "5px" }}
              type="number"
              placeholder="Limite"
              className="form-control"
              id="limite"
              name="limite"
              value={values.limite!}
              onChange={handleChange}
            />
          </div>
          <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="typesOfCreditCardsID"
            name="typesOfCreditCardsID"
            onChange={handleChange}
            value={values.typesOfCreditCardsID!}
          >
            <option value="" disabled>Select type of credit card</option>
            {typesOfCreditCards.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="submit"
           onClick={sendToOverview}
           className="ui blue basic button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
          >
          Cancel
        </button>
        <button
          type="submit"
          className="ui green button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
        >
          Submit
        </button>
        </div>
      </form>
      </Segment>
      <br/>
      <br/>
      <Footer/>
    </>
  );
}
