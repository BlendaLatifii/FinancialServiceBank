import React, { useState } from 'react';
import axios from 'axios';
import { ClientModel } from '../interfaces/client-model';
import { ClientBankAccountModel } from '../interfaces/clientaccount-model';
import { CreditCardsModel } from '../interfaces/creditCards-model';
import { TransactionModel } from '../interfaces/transaction-model';
import Header from './Header';

export default function MyProfile() {
    const [personalNumber, setPersonalNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [client, setClient] = useState<ClientModel | null>(null);
    const [clientBankAccount, setClientBankAccount] = useState<ClientBankAccountModel |null>(null);
    const[creditCards, setCreditCards]= useState<CreditCardsModel |null>(null);
    const[transaction, setTransaction]= useState<TransactionModel |null>(null);

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPersonalNumber(e.target.value);
    };
    const handleInputChange1 = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(e.target.value);
    }
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(personalNumber!=null){
            const response = await axios.get(`https://localhost:7254/api/Client/personalNumber/${personalNumber}`);
            const result = await axios.get(`https://localhost:7254/api/ClientBankAccount/personalNumber/${personalNumber}`);
            setClient(response.data);
            setClientBankAccount(result.data);
            }
        } catch (err) {
            setClient(null);
            setClientBankAccount(null);
        }
    };
    const handleSubmit1= async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(accountNumber!=null){
            const creditCardsResponse = await axios.get(`https://localhost:7254/api/CreditCards/accountNumber/${accountNumber}`);
          // const transactionResponse = await axios.get(`https://localhost:7254/api/Transactions/accountNumber/${accountNumber}`);
            setCreditCards(creditCardsResponse.data);
           //setTransaction(transactionResponse.data);
            }
        } catch (err) {
            setCreditCards(null);
            setTransaction(null);
        }
        }

    return (
        <>
        <Header/>
        <br/>
        <br/>
        <div style={styles.container}>
            <h1 style={{ textAlign: 'center',
        color: '#333'}}>My Profile</h1>
            <form style={{ display: 'flex',
        flexDirection: 'column',
        gap: '15px'}} onSubmit={handleSubmit}>
                <div>
                    <label style={styles.label}>Personal Number:</label>
                    <input type="text" value={personalNumber} onChange={handleInputChange} style={styles.input} required />
                </div>
                <button type="submit" style={styles.button}>Get Profile</button>
            </form>
           {client && (
                <div style={styles.clientDetails}>
                    <h2>Client Details</h2>
                    <p><strong>First Name:</strong> {client.firstName}</p>
                    <p><strong>Middle Name:</strong> {client.middleName}</p>
                    <p><strong>Last Name:</strong> {client.lastName}</p>
                    <p><strong>Phone Number:</strong> {client.phoneNumber}</p>
                    <p><strong>Email Address:</strong> {client.emailAddress}</p>
                </div>
            )}
             {clientBankAccount && (
                <div style={styles.clientDetails}>
                    <h2>Bank Account Details</h2>
                    <p><strong>Account Number:</strong> {clientBankAccount.accountNumberGeneratedID}</p>
                    <p><strong>Current Balance:</strong> {clientBankAccount.currentBalance}</p>
                </div>
            )}
         </div>
         <br/>
         <br/>

         <div style={styles.container}>
          <form style={{ display: 'flex',
          flexDirection: 'column',
          gap: '15px'}} onSubmit={handleSubmit1}>
        <div>
            <label style={styles.label}>Account Number:</label>
            <input type="text" value={accountNumber} onChange={handleInputChange1} style={styles.input} required />
        </div>
        <button type="submit" style={styles.button}>Get BankAccount Details</button>
        {creditCards && (
                <div style={styles.clientDetails}>
                    <h2>Client Details</h2>
                    <p><strong>cVV:</strong> {creditCards.cVV}</p>
                    <p><strong>ValidThru:</strong> {creditCards.validThru}</p>
                </div>
            )}
         {transaction && (
                <div style={styles.clientDetails}>
                    <h2>Transaction Details</h2>
                    <p><strong>DestinationClient Bank Account:</strong> {transaction.destinationClientBankAccount}</p>
                    <p><strong>transaction Amount:</strong> {transaction.transactionAmount}</p>

                </div>
            )}     
    </form>
    </div>
    </>
 )
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    clientDetails: {
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
};