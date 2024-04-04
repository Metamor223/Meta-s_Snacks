import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './style.css';
import UserStore from "./client/store/UserStore";
import ProductStore from "./client/store/ProductStore";
import WarehouseStore from "./client/store/WarehouseStore";

export const Context = createContext(null)
console.log(process.env.REACT_APP_META_SNACKS)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            product: new ProductStore(),
            ingredient: new WarehouseStore()
        }}>
        <App/>
        </Context.Provider>
    </React.StrictMode>
)
