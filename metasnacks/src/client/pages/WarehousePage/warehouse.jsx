import React, {useContext} from 'react';
import './warehouse.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Warehouse = observer(() => {

    const {Ingredient} = useContext(Context)

    return (
        <div>

        </div>
    );
});

export default Warehouse;