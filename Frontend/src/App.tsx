import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';

import { Routes, Route } from 'react-router-dom'; 
import RegisterTable from './Components/RegisterTable';
import { User } from './interfaces/users';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/Register' element={<Register />} /> 
        <Route path='/Login' element={<Login />} /> 
        <Route path ='/RegisterTable' element={<RegisterTable />}/>
      </Routes>
    </>
  );
}

export default App;