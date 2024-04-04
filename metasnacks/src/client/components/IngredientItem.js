import React from 'react';
import {useParams} from "react-router-dom";

const IngredientItem = ({Ingredient}) => {

    const {id} = useParams()

    return (
        <div className={"product"}
             key={Ingredient.id}>
            <div className="headerProduct">
                <p>{Ingredient.name}</p>
            </div>
            <div className="footerProduct">
                <p>{Ingredient.count}р</p>
                <li>Add to Cart</li>
            </div>
        </div>
    );
};

export default IngredientItem;