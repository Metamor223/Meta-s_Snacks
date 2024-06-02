import React, {useContext, useEffect, useState} from 'react';
import './warehouse.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {changeIngredient, fetchIngredient} from "../../http/warehouseAPI";
import ProductListForWarehouse from "../../components/ProductFiles/ProductListForWarehouse";
import AddProducts from "../../components/AddDeleteEdit/AddProducts";

const Warehouse = observer(() => {

    const {product} = useContext(Context)

    const [change, setChange] = useState([])

    useEffect(() => {
        fetchIngredient().then(data=>{
            product.setProduct(data);
            setChange(data);
        })
    }, []);


    const save = () => {
        changeIngredient(change).then(data => {
            product.setProduct(data);
            setChange(data);
        });
    }

    return (
        <div className="WarehouseCatalog">
            <ul>
                <ProductListForWarehouse/>
            </ul>
            <button onClick={save}>Save changes</button>
            <AddProducts/>
        </div>
    );
});
export default Warehouse;