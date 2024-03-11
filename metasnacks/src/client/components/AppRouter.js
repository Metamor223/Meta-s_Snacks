import React, {Component, useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import LogIn from "../pages/LoginWindow/logIn";
import Registration from "../pages/RegistrationWindow/Registration";
import Navbar from "../pages/header.js/navbar";
import Catalog from "../pages/CatalogPage/Catalog";
import Contacts from "../pages/ContactsPage/Contacts";
import Orders from "../pages/OrdersForFactory/Orders";
import Account from "../pages/AccountPage/Account";
import Cart from "../pages/CartPage/Cart";
import {authRoutes, publicRoutes} from "../routes";
import {CATALOG_ROUTE} from "../utils/consts";
import {Context} from "../../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            <Route path="*" element={
                <>
                    <div className="container">
                        <Routes>

                            {authRoutes.map(({path, Component}) =>
                             <Route key={path} path={path} element={<Component/>} exact/>
                            )}

                            {publicRoutes.map(({path, Component}) =>
                              <Route key={path} path={path} element={<Component/>} exact/>
                            )}

                        </Routes>
                    </div>
                    </>
                }
             />
        </Routes>
        // <Routes>
        //     <Route path="/" element = {<Navigate to="/login"/>}/>
        //     <Route path="/login" element={<LogIn />} />
        //     <Route path="/registration" element = {<Registration/>}/>
        //     <Route
        //         path='/main/*'
        //         element={
        //             <>
        //                 <Navbar />
        //                 <div className="container">
        //                     <Routes>
        //                         <Route index element={<Navigate to="/main/catalog"/>}/>
        //                         <Route path='/catalog' element = {<Catalog/>}/>
        //                         <Route path='contacts' element = {<Contacts/>}/>
        //                         <Route path='orders' element = {<Orders/>}/>
        //                         <Route path='account' element = {<Account/>}/>
        //                         <Route path='cart' element = {<Cart/>}/>
        //                     </Routes>
        //                 </div>
        //             </>
        //         }
        //     />
        // </Routes>
    );
};

export default AppRouter;