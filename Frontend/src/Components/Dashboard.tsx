import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Header from './Header';
import { TransactionService } from '../services/TransactionService';
import { TransactionTypePercentageModel } from '../interfaces/TransactionTypePercentageModel';
import { ClientBankAccountService } from '../services/ClientBankAccountService';
import { ClientService } from '../services/ClientService';
import { CreditCardsService } from '../services/CreditCardsService';

export default function Dashboard() {
  const [pieData, setPieData] = useState<TransactionTypePercentageModel[]>([]);
  const [accountCount, setAccountCount] = useState<number>(0);
  const [clientCount, setClientCount] = useState<number>(0);
  const [creditCardsCount, setCreditCardsCount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const transactionPercentages = await TransactionService.GetAllTransactionsPercentage();
      const totalTransactions = transactionPercentages.reduce((total, percentageModel) => total + percentageModel.count, 0);
      const percentagesWithCorrectPercentage = transactionPercentages.map((percentageModel) => ({
        ...percentageModel,
        percentage: (percentageModel.count / totalTransactions) * 100,
      }));
      setPieData(percentagesWithCorrectPercentage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAccountCount = async () => {
    try {
      const count = await ClientBankAccountService.CountAccount();
      setAccountCount(count);
    } catch (error) {
      console.error('Error fetching account count:', error);
    }
  };
  useEffect(() => {
    fetchAccountCount();
  }, []);

  const fetchClientCount = async () => {
    try {
      const count = await ClientService.CountAccount();
      setClientCount(count);
    } catch (error) {
      console.error('Error fetching account count:', error);
    }
  };
  useEffect(() => {
    fetchClientCount();
  }, []);
  const fetchCreditCardsCount = async () => {
    try {
      const count = await CreditCardsService.CountCreditCards();
      setCreditCardsCount(count);
    } catch (error) {
      console.error('Error fetching account count:', error);
    }
  };
  useEffect(() => {
    fetchCreditCardsCount();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const styles = {
    dashboard: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px'
    },
    link: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '150px',
      height: '150px',
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.2em',
      fontWeight: 'bold',
      borderRadius: '8px',
      transition: 'transform 0.3s, background-color 0.3s'
    },
    linkHover: {
      transform: 'scale(1.05)'
    },
    register: { backgroundColor: '#ff6347' },  // Tomato
    client: { backgroundColor: '#4682b4' },   // Steel Blue
    bankAccount: { backgroundColor: '#32cd32' }, // Lime Green
    clientAccount: { backgroundColor: '#ff4500' }, // Orange Red
    transaction: { backgroundColor: '#1e90ff' }, // Dodger Blue
    creditCards: { backgroundColor: '#9370db' }, // Medium Purple
    widgetContainer: {
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%'
    },
    widget: {
      flex: '1',
      margin: '0 10px',
      padding: '20px',
      border: '1px solid ',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }
  };

  return (
    <>
      <Header />
      <br />
      <div style={{ display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px'}}>
        <Link to="/RegisterTable" style={{ ...styles.link, ...styles.register }}>Register</Link>
        <Link to="/ClientTable" style={{ ...styles.link, ...styles.client }}>Client</Link>
        <Link to="/BankAccountTable" style={{ ...styles.link, ...styles.bankAccount }}>Bank Account</Link>
        <Link to="/ClientAccountTable" style={{ ...styles.link, ...styles.clientAccount }}>Client Account</Link>
        <Link to="/TransactionTable" style={{ ...styles.link, ...styles.transaction }}>Transaction</Link>
        <Link to="/CreditCardsTable" style={{ ...styles.link, ...styles.creditCards }}>Credit Cards</Link>

      <div>
      <div style={styles.widget}>
          <h2>Clients</h2>
          <p>{clientCount}</p>
        </div>
        <div style={styles.widget}>
          <h2>Client Bank Accounts</h2>
          <p>{accountCount}</p>
        </div>
        <div style={styles.widget}>
          <h2>CreditCards</h2>
          <p>{creditCardsCount}</p>
        </div>
        </div>  
      <div>
        <h2>Pie Chart</h2>
        {pieData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="percentage"
              nameKey="transactionType"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percentage }) => `${name} ${percentage.toFixed(2)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
    </>
  );
}