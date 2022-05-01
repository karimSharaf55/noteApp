import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './componet/Home/Home';
import Navbar from './componet/Navbar/Navbar';
import Login from './componet/Login/Login';
import Register from './componet/Register/Register';
import Notfound from './componet/Notfound/Notfound';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode';

function App() {
let navigate=useNavigate();
  const [userData, setuserData] = useState(null)
useEffect(() => {
if (localStorage.getItem('userToken')) {
  getuserDate()
}
}, [])

  
  function getuserDate() {
    let decodeToken = jwtDecode(localStorage.getItem('userToken'))
    console.log(decodeToken);
    setuserData(decodeToken)
  }
  function logout() {
    localStorage.removeItem('userToken')
    setuserData(null)
    navigate('/Login')
  }

  return (
  <>
  <Navbar logout={logout} userData={userData}/>
<Routes>


  <Route path='/' element={<Login/>} />
  <Route path='Login' element={<Login getuser={getuserDate}/>} />
  <Route path='Home' element={<Home/>} />
  <Route path='Register' element={<Register/>} />
  <Route path='*' element={<Notfound/>} />


</Routes>
  
  </>
  
     
 
    
 
  );
}

export default App;
