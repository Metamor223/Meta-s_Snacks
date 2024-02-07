import React from 'react';
import {Route, Routes, Outlet, Router, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './client/pages/header.js/navbar';
import Catalog from './client/pages/CatalogPage/Catalog';
import Contacts from './client/pages/ContactsPage/Contacts';
import Cart from './client/pages/CartPage/Cart';
import Registration from './client/pages/RegistrationWindow/Registration';
import LogIn from "./client/pages/LoginWindow/logIn";
import Account from './client/pages/AccountPage/Account';
import Orders from './client/pages/OrdersForFactory/Orders';
import AppRouter from "./client/components/AppRouter";


export default function App() {
  return (
     <AppRouter/>
  )
}
