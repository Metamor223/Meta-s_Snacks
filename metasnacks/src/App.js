import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, Outlet, Router, Navigate, BrowserRouter} from 'react-router-dom';
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
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./client/http/userAPI";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
        }, 1000);
    }, [])



  return (
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
  )
})
export default App;