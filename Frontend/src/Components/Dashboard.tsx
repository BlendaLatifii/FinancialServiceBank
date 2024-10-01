import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Header from './Header';
import { TransactionService } from '../services/TransactionService';
import { TransactionTypePercentageModel } from '../interfaces/TransactionTypePercentageModel';
import { ClientBankAccountService } from '../services/ClientBankAccountService';
import { CreditCardsService } from '../services/CreditCardsService';
import { LoanService } from '../services/LoanService';
import { AuthService } from '../services/AuthService';

export default function Dashboard() {
  const [pieData, setPieData] = useState<TransactionTypePercentageModel[]>([]);
  const [accountCount, setAccountCount] = useState<number>(0);
  const [creditCardsCount, setCreditCardsCount] = useState<number>(0);
  const [loansCount, setLoansCount] = useState<number>(0);
  const [studentClients, setStudentClients] = useState<string[]>([]);

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
  const fetchLoansCount = async () => {
    try {
      const count = await LoanService.CountLoans();
      setLoansCount(count);
    } catch (error) {
      console.error('Error fetching account count:', error);
    }
  };
  useEffect(() => {
    fetchLoansCount();
  }, []);
  const fetchStudentClients = async () => {
    try {
      const clients = await ClientBankAccountService.GetStudentAccountClients();
      setStudentClients(clients);
    } catch (error) {
      console.error('Error fetching student clients:', error);
    }
  };
  useEffect(() => {
    fetchStudentClients();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const styles = {
    dashboard: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
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
      borderRadius: '12px',
      transition: 'transform 0.3s, background-color 0.3s',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    linkHover: {
      transform: 'scale(1.05)'
    },
    register: { backgroundColor: '#ff6347', backgroundImage: 'linear-gradient(135deg, #ff6347 0%, #ff4500 100%)' },  // Tomato to Orange Red
    bankAccount: { backgroundColor: '#32cd32', backgroundImage: 'linear-gradient(135deg, #32cd32 0%, #228b22 100%)' }, // Lime Green to Forest Green
    clientAccount: { backgroundColor: '#ff4500', backgroundImage: 'linear-gradient(135deg, #ff4500 0%, #ff6347 100%)' }, // Orange Red to Tomato
    transaction: { backgroundColor: '#1e90ff', backgroundImage: 'linear-gradient(135deg, #1e90ff 0%, #4682b4 100%)' }, // Dodger Blue to Steel Blue
    creditCards: { backgroundColor: '#9370db', backgroundImage: 'linear-gradient(135deg, #9370db 0%, #8a2be2 100%)' }, // Medium Purple to Blue Violet
    widgetContainer: {
      margin: '20px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      flexWrap: 'wrap',
      gap: '20px'
    },
    widget: {
      flex: '1 1 300px',
      margin: '10px',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    pieChartContainer: {
      flex: '1',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableContainer: {
      flex: '1',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f8f8f8',
      fontWeight: 'bold',
    },
    tableRow: {
      borderBottom: '1px solid #e0e0e0',
    },
    tableCell: {
      padding: '10px',
      textAlign: 'left',
    },
  };

  return (
    <>
      <Header />
      <br />
      <div style={{display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif'}}>
        <Link to="/RegisterTable" style={{ ...styles.link, ...styles.register }}>Register</Link>
        <Link to="/BankAccountTable" style={{ ...styles.link, ...styles.bankAccount }}>Bank Account</Link>
        <Link to="/ClientAccountTable" style={{ ...styles.link, ...styles.clientAccount }}>Client Account</Link>
        <Link to="/TransactionTable" style={{ ...styles.link, ...styles.transaction }}>Transaction</Link>
        <Link to="/CreditCardsTable" style={{ ...styles.link, ...styles.creditCards }}>Credit Cards</Link>
      </div>

      <div style={{margin: '20px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      flexWrap: 'wrap',
      gap: '20px'}}>
        <div style={{flex: '1 1 300px',
      margin: '10px',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'}}>
          <h2>Client Bank Accounts</h2>
          <p>{accountCount}</p>
        </div>
        <div style={{flex: '1 1 300px',
      margin: '10px',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'}}>
          <h2>Credit Cards</h2>
          <p>{creditCardsCount}</p>
        </div>
        <div style={{flex: '1 1 300px',
      margin: '10px',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'}}>
          <h2>Loans</h2>
          <p>{loansCount}</p>
        </div>
      </div>
<div style={{display: "flex"}}>
      <div style={styles.pieChartContainer}>
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
      <div style={styles.tableContainer}>
        <h2>Student Account Clients</h2>
        {studentClients.length > 0 ? (
          <table style={{width: '100%',
            borderCollapse: 'collapse'}}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={{padding: '10px',
      textAlign: 'left'}}>Name</th>
              </tr>
            </thead>
            <tbody>
              {studentClients.map((name, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={{padding: '10px',
      textAlign: 'left'}}>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      </div>
    </>
  );
}
