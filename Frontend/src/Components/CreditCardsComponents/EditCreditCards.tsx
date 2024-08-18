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

export default function EditCreditCards() {
  const { id } = useParams<{ id: string}>();
  const [typesOfCreditCards, setTypesOfCreditCards] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<CreditCardsModel>({
    id:id!,
    clientAccountNumber: '',
    typesOfCreditCardsID: 0,
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
      navigate('/HomePage');
  } catch (error) {
    console.error("Error creating creditCards:", error);
  }
};
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
    <form onSubmit={handleSubmit} style={{ padding: "20px", margin: "20px" }}>
        <h2 style={{ padding: "5px", margin: "5px" }}>Credit Cards</h2>
        <div className="form-group">
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
            {typesOfCreditCards.map((x)=>
              (<option key={x.key} value={x.value}>{x.text}</option>))}
          </select>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "5px", margin: "5px" }}
        >
          Submit
        </button>
      </form>
      <Footer/>
    </>
  );
}
