import React from 'react';
import '../pages/WarehousePage/warehouse.css'

const IngredientItem = ({ ingredient }) => {
    return (
        <div className="ingredient" key={ingredient.id}>
            <div className="headerIngredient">
                <p>{ingredient.name}</p>
            </div>
            <div className="footerIngredient">
                <p>{ingredient.count}</p>
            </div>
        </div>
    );
};

export default IngredientItem;
