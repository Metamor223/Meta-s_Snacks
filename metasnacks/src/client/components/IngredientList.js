import React, {useContext} from 'react';
import {Context} from "../../index";
import IngredientItem from "./IngredientItem";
import {observer} from "mobx-react-lite";

const IngredientList = () => {

    const{ingredient} = useContext(Context)

    return (
        <div className="List">
            {ingredient.ingredient.map(ingredient=>
                <IngredientItem key={ingredient.id} ingredient={ingredient}/>
            )}
        </div>
    );
};

export default IngredientList;