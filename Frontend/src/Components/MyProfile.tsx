import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaUser, FaCreditCard, FaWallet, FaExchangeAlt } from 'react-icons/fa';
import Header from './Header';
import { ClientBankAccountModel } from '../interfaces/clientaccount-model';
import { CreditCardsModel } from '../interfaces/creditCards-model';
import { TransactionModel } from '../interfaces/transaction-model';
import { UserModel } from '../interfaces/users';
import { LoanModel } from '../interfaces/loan-model';

export default function MyProfile() {
    const [user, setUser] = useState<UserModel[]>([]);
    const [clientBankAccounts, setClientBankAccounts] = useState<ClientBankAccountModel[]>([]);
    const [creditCards, setCreditCards] = useState<CreditCardsModel[]>([]);
    const [transactions, setTransactions] = useState<TransactionModel[]>([]);
    const [loans, setLoans] = useState<LoanModel[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/UserProfile/User');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        const fetchClientBankAccounts = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/UserProfile/ClientBankAccount');
                setClientBankAccounts(response.data);
            } catch (error) {
                console.error('Error fetching bank accounts:', error);
            }
        };

        const fetchCreditCards = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/UserProfile/CreditCards');
                setCreditCards(response.data);
            } catch (error) {
                console.error('Error fetching credit cards:', error);
            }
        };

        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/UserProfile/Transactions');
                setTransactions(response.data);
            } catch (err) {
                console.error('Failed to fetch transactions:', err);
            }
        };
        const fetchLoans = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/UserProfile/Loans');
                setLoans(response.data);
            } catch (err) {
                console.error('Failed to fetch loans:', err);
            }
        };

        fetchCreditCards();
        fetchClientBankAccounts();
        fetchTransactions();
       fetchLoans();
        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={{textAlign:'left',
        color: 'rgb(41 113 77)',
        marginBottom: '30px',
        fontSize: '2.5em'}}>My Profile</h1>
                <div className="row" style={{display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'}}>
                    {user.length > 0 && (
                        <div style={{backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            width: 'calc(50% - 10px)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                            position: 'relative'}}>
                            <FaUser style={{position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1.5em',
        color: '#004080'}} />
                            <h2 style={styles.cardTitle}>User Details</h2>
                            {user.map(account => (
                                <div key={account.id} style={styles.details}>
                                    <p><strong>Username:</strong> {account.userName}</p>
                                    <p><strong>Middle Name:</strong> {account.middleName}</p>
                                    <p><strong>Last Name:</strong> {account.lastName}</p>
                                    <p><strong>Email:</strong> {account.email}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {clientBankAccounts.length > 0 && (
                        <div style={{backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            width: 'calc(50% - 10px)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                            position: 'relative'}}>
                            <FaWallet style={{position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1.5em',
        color: '#004080'}} />
                            <h2 style={styles.cardTitle}>Bank Account Details</h2>
                            {clientBankAccounts.map(account => (
                                <div key={account.id} style={styles.details}>
                                    <p><strong>Account Number:</strong> {account.accountNumberGeneratedID}</p>
                                    <p><strong>Current Balance:</strong> ${account.currentBalance}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="row" style={{display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'}}>
                    {creditCards.length > 0 && (
                        <div style={{backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            width: 'calc(50% - 10px)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                            position: 'relative'}}>
                            <FaCreditCard style={{position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1.5em',
        color: '#004080'}} />
                            <h2 style={styles.cardTitle}>Credit Card Details</h2>
                            {creditCards.map(card => (
                                <div key={card.id} style={styles.details}>
                                    <p><strong>Valid Thru:</strong> {card.validThru}</p>
                                    <p><strong>CVV:</strong> {card.cvv}</p>
                                    <p><strong>Limit:</strong> ${card.limite}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {transactions.length > 0 && (
                        <div style={{backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            width: 'calc(50% - 10px)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                            position: 'relative'}}>
                            <FaExchangeAlt style={{position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1.5em',
        color: '#004080'}} />
                            <h2 style={styles.cardTitle}>Transaction Details</h2>
                            {transactions.map(transaction => (
                                <div key={transaction.id} style={styles.details}>
                                    <p><strong>Transaction Type:</strong> {transaction.transactionType}</p>
                                    <p><strong>Amount:</strong> ${transaction.transactionAmount}</p>
                                    <p><strong>Destination Account:</strong> {transaction.destinationClientBankAccount!}</p>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                 {loans.length > 0 && (
                        <div style={{backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            width: 'calc(50% - 10px)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                            position: 'relative'}}>
                            <FaExchangeAlt style={{position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1.5em',
        color: '#004080'}} />
                            <h2 style={styles.cardTitle}>Loans Details</h2>
                            {loans.map(loan => (
                                <div key={loan.id} style={styles.details}>
                                    <p><strong>Amount:</strong> ${loan.loanAmount}</p>
                                    <p><strong>Interes Rate:</strong> {loan.interestRate}</p>
                                    <p><strong>Loan Period:</strong> {loan.loanPeriod}</p>
                                    <p><strong>Monthly Payment:</strong> {loan.monthlyPayment}</p>
                                </div>
                            ))}
                        </div>
                    )} 
            </div>
        </>
    );
}

const styles = {
    container: {
        width: '100%',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#004080',
        marginBottom: '30px',
        fontSize: '2.5em',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        width: 'calc(50% - 10px)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
        position: 'relative',
    },
    cardTitle: {
        fontSize: '1.8em',
        color: '#333',
        marginBottom: '10px',
        borderBottom: '2px solid #004080',
        paddingBottom: '5px',
    },
    details: {
        marginTop: '10px',
        fontSize: '1em',
        color: '#555',
    },
    icon: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1.5em',
        color: '#004080',
    },
};