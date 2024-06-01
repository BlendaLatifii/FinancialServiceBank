import React, { useState } from 'react';
import axios from 'axios';
import { ClientModel } from '../interfaces/client-model';

export default function MyProfile() {
    const [personalNumber, setPersonalNumber] = useState('');
    const [client, setClient] = useState<ClientModel | null>(null);

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPersonalNumber(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(personalNumber!=null){
            const response = await axios.get(`https://localhost:7254/api/Client/personalNumber/${personalNumber}`);
            setClient(response.data);
            }
        } catch (err) {
            setClient(null);
        }
    };

    return (
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
         </div>
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