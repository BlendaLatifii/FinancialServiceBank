import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        margin: 0,
        padding: 0,
    },
    h2: {
        marginBottom: '1rem',
    },
    form: {
        maxWidth: '500px',
        margin: 'auto',
    },
    formOutline: {
        marginBottom: '1.5rem',
    },
    btn: {
        display: 'block',
        width: '100%',
    },
    p: {
        color: 'black',
        textAlign: 'center',
    }
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event:any) => {
       // event.preventDefault();
        try {
            const response = await axios.post('https://localhost:7254/api/Account/forgotPassword', { email });
            setMessage(response.data.message);
           navigate('/ResetPassword');
        } catch (error) {
            setMessage('Error sending email');
        }
    };

    return (
        <div style={styles.body}>
            <section className="text-center">
                <div
                    className="p-5 bg-image"
                    style={{
                        marginTop: "-100px",
                        backgroundImage: `url(${process.env.PUBLIC_URL}/log.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "300px",
                    }}
                ></div>
                <div
                    className="card mx-4 mx-md-5 shadow-5-strong"
                    style={{
                        marginTop: "-100px",
                        background: "hsla(0, 0%, 100%, 0.8)",
                        backdropFilter: "blur(40px)",
                    }}
                >
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5" style={styles.h2}>Forgot Password</h2>
                                <form onSubmit={handleSubmit} style={styles.form}>
                                    <div className="form-outline mb-4" style={styles.formOutline}>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label className="form-label" htmlFor="email">
                                            Email address
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mb-4"
                                        style={styles.btn}
                                    ><Link to="/ResetPassword" className="link-info">
                                     Submit
                                        </Link>
                                    </button> 
                                    {message && <p style={{color: 'black',
        textAlign: 'center',}}>{message} </p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;
