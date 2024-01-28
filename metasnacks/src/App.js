import React from 'react';
import {Route, Routes, Outlet, Router, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './client/header.js/navbar';
import Catalog from './client/CatalogPage/Catalog';
import Contacts from './client/ContactsPage/Contacts';
import Cart from './client/CartPage/Cart';
import Registration from './client/RegistrationWindow/Registration';
import LogIn from "./client/LoginWindow/logIn";
import Account from './client/AccountPage/Account';
import Orders from './client/OrdersForFactory/Orders';


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
              <Route path='orders' element = {<Orders/>}/>
              <Route path='account' element = {<Account/>}/>
              <Route path='cart' element = {<Cart/>}/>
            </Routes>
            </div>
      </>}
      />
    </Routes>
  )
}
