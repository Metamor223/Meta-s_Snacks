import React, {useContext, useEffect} from 'react';
import './warehouse.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {fetchIngredient} from "../../http/warehouseAPI";
import IngredientList from "../../components/IngredientList";
import AddIngredient from "../../components/AddDeleteEdit/AddIngredient";

const Warehouse = observer(() => {

    const {ingredient} = useContext(Context)

    useEffect(() => {
        fetchIngredient().then(data=>ingredient.setIngredient(data.rows))
    }, []);

    return (
        <div className="WarehouseCatalog">
            <ul>
                <IngredientList/>
            </ul>
                <AddIngredient/>
        </div>
    );
});

export default Warehouse;