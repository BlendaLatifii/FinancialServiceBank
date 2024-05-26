import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { ListItemModel } from '../../interfaces/list-item-model';
import { BankAccountService } from '../../services/BankAccountService';
import { SelectListItem } from '../../interfaces/select-list-item';
import { ClientBankAccountModel } from '../../interfaces/clientaccount-model';

export default function ClientAccount() {
  const [accountTypes, setAccountTypes] = useState<ListItemModel[]>([]);
  const [formData, setFormData] = useState<ClientBankAccountModel>({
    personalNumber: '',
    currentBalance: null,
    bankAccountId: null,
  } as ClientBankAccountModel);

  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let body = {
        personalNumber: formData.personalNumber,
        currentBalance: formData.currentBalance,
        bankAccountId: formData.bankAccountId
      }
      const response = await axios.post(`https://localhost:7254/api/ClientBankAccount`, body);
       setRegistered(true);
       navigate("/ClientAccount");
    } catch (error) {
      console.error('Error creating account :', error);
    }
  };
  const [accountTypeSelectList, setaccountTypeSelectList] = useState<SelectListItem[]>([])
  const fetchAccountTypes = async () => {
    try {
      const response = await BankAccountService.GetSelectList(); 
      setAccountTypes(response);

      setaccountTypeSelectList(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  useEffect(()=>{
    fetchAccountTypes()
  },[])

  
  return(
    <>  
    <Header/>
    <div className="card-body py-5 px-md-5">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-5">Account</h2>
          <form onSubmit={handleSubmit} className="border border-light-subtle" style={{ padding: '8px' }} >
            <div className="row">
              <div className="col-md-6 mb-4">
                <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="personalNumber"> personalNumber</label>
                  <input type="text" id="personalNumber" className="form-control"
                   name="personalNumber" value={formData.personalNumber} onChange={handleChange} 
                     />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="currentBalance">Current Balance</label>
                  <input type="text" id="currentBalance" name="currentBalance" value={formData.currentBalance || ''} className="form-control" onChange={handleChange}  />
                </div>
              </div>
            </div>
             <select name="bankAccountId" id="bankAccountId" onChange={handleChange} data-mdb-input-init className="form-control form-outline mb-4">
              {accountTypeSelectList.map((x)=>(
                <option key={x.key} value={x.value}>{x.text}</option>
              ))}
             </select>
            <button type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

