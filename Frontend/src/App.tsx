import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Services from './Components/Services';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
import Register from './Components/Register';

import { Routes, Route } from 'react-router-dom'; 
import RegisterTable from './Components/RegisterTable';
import { User } from './interfaces/users';
import HomePage from './Components/HomePage';
import RegisterForClients from './Components/RegisterForClients';
function App() {
  return (
    <>
      <Routes>
      <Route path='/Header' element={<Header/>}/>
      <Route path='/Footer' element={<Footer/>}/>
        <Route path='/' element={<HomePage />} /> 
        <Route path='/Services' element={<Services />} /> 
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Register' element={<Register />} /> 
        <Route path='/Login' element={<Login />} /> 
        <Route path ='/RegisterTable' element={<RegisterTable />}/>
        <Route path ='/RegisterForClients' element={<RegisterForClients />}/>
      </Routes>
    </>
  );
}

export default App;