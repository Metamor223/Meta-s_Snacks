import React from 'react';
import {Route, Routes, Outlet, Router, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './header.js/navbar';
import Catalog from './CatalogPage/Catalog';
import Contacts from './ContactsPage/Contacts';
import Cart from './CartPage/Cart';
import Registration from './RegistrationWindow/Registration';
import LogIn from "./LoginWindow/logIn";
import Account from './AccountPage/Account';


export default function App() {
  return (
      <Routes>
        <Route path="/" element = {<Navigate to="/login"/>}/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/registration" element = {<Registration/>}/>
        <Route
          path='/main/*'
          element={
            <>
          <Navbar />  
            <div className="container">
            <Routes>
              <Route index element={<Navigate to="/main/catalog"/>}/>
              <Route path='/catalog' element = {<Catalog/>}/>
              <Route path='contacts' element = {<Contacts/>}/>
              <Route path='account' element = {<Account/>}/>
              <Route path='cart' element = {<Cart/>}/>
            </Routes>
            </div>
      </>}
      />
    </Routes>
  )
}
