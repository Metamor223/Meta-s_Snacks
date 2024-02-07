import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './style.css';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./client/store/UserStore";

const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore()
        }}>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>
)
