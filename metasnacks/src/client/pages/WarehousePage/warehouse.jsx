import React, {useContext, useEffect, useState} from 'react';
import './warehouse.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {changeIngredient, fetchIngredient} from "../../http/warehouseAPI";
import IngredientList from "../../components/IngredientList";
import AddIngredient from "../../components/AddDeleteEdit/AddIngredient";

const Warehouse = observer(() => {

    const {ingredient} = useContext(Context)

    const [change, setChange] = useState([])

    useEffect(() => {
        fetchIngredient().then(data=>{
            ingredient.setIngredient(data);
            setChange(data);
        })
    }, []);


    const save = () => {

        changeIngredient(change).then(data => {
            ingredient.setIngredient(data);
            setChange(data);
        });
    }

    return (
        <div className="WarehouseCatalog">
            <ul>
                <IngredientList/>
            </ul>
            <button onClick={save}>Save changes</button>
                <AddIngredient/>
        </div>
    );
});

export default Warehouse;