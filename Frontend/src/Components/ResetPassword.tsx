import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const query = new URLSearchParams(useLocation().search);
    const email = query.get('email');
    const token = query.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate =useNavigate();
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('https://localhost:7254/api/Account/resetPassword', { email, token, newPassword, confirmPassword });
            setMessage(response.data.message);
            navigate('/Login');
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;