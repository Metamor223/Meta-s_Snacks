import React, {useContext} from 'react';
import ProductItem from "./ProductItem";
import {Context} from "../../index";
import IngredientItem from "./IngredientItem";

const IngredientList = () => {

    const{ingredient} = useContext(Context)

    return (
        <div>
            {ingredient.ingredient.map(ingredient=>
                <IngredientItem key={ingredient.id} ingredient={ingredient}/>
            )}
        </div>
    );
};

export default IngredientList;