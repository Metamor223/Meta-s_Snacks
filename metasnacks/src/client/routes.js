import React from 'react';
import {
    ACCOUNT_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACT_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE, WAREHOUSE_ROUTE
} from "./utils/consts";

import Cart from "./pages/CartPage/Cart";
import AdminPage from "./pages/AdminPage/Admin";
import LogIn from "./pages/LoginWindow/logIn";
import Registration from "./pages/RegistrationWindow/Registration";
import Orders from "./pages/OrdersForFactory/Orders";
import Account from "./pages/AccountPage/Account";
import Catalog from "./pages/CatalogPage/Catalog";
import Contacts from "./pages/ContactsPage/Contacts";
import Warehouse from "./pages/WarehousePage/warehouse";

export const authRoutes =  [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: WAREHOUSE_ROUTE,
        Component: Warehouse
    }
]

export const publicRoutes =  [
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: LOGIN_ROUTE,
        Component: LogIn
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: CONTACT_ROUTE,
        Component: Contacts
    }
]
