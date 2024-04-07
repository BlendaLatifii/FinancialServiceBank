import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';

import { Routes, Route } from 'react-router-dom'; 
import RegisterTable from './Components/RegisterTable';
import { User } from './interfaces/users';

const users = [{email:'test',username:'test'} as User]
const deleteUser = (arg0: React.Key | null | undefined)=>{

}

const registerUser =()=>{

}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/Register' element={<Register />} /> 
        <Route path='/Login' element={<Login />} /> 
        <Route path ='/RegisterTable' element={<RegisterTable users={users} deleteUser={deleteUser } registerUser={registerUser} />}/>
      </Routes>
    </>
  );
}

export default App;