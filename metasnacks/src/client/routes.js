import React from 'react';
import {
    ADMIN_ROUTE,
    CATALOG_ROUTE,
    CUSTOMERS_ROUTE, FEEDBACK_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    WAREHOUSE_ROUTE
} from "./utils/consts";

import Feedback from "./pages/ChatPage/Feedback";
import AdminPage from "./pages/AdminPage/Admin";
import LogIn from "./pages/LoginWindow/logIn";
import Registration from "./pages/RegistrationWindow/Registration";
import Orders from "./pages/OrdersForFactory/Orders";
import Catalog from "./pages/CatalogPage/Catalog";
import Warehouse from "./pages/WarehousePage/warehouse";
import Customers from "./pages/CustomersPage/Customers";

export const authRoutes =  [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
      path: CUSTOMERS_ROUTE,
      Component: Customers
    },
    {
        path: FEEDBACK_ROUTE,
        Component: Feedback
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
    }
]
