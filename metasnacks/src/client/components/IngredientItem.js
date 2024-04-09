import React, {useEffect} from 'react';
import {deleteType} from "../http/productAPI";
import {deleteIngredient, fetchIngredient} from "../http/warehouseAPI";
import {observer} from "mobx-react-lite";

const IngredientItem = ({ ingredient }) => {

    const Delete = () =>{
        const Id = ingredient.id
        deleteIngredient(Id)
            .then(()=>{
                useEffect(() => {
                    fetchIngredient().then(data =>{ingredient.setIngredient(data)})
                        .catch(error => {
                            console.error('Error fetching ingredient:', error);
                        });
                }, []);
            })
            .catch(error=>{console.error('Error deleting category:', error)})
    }


    return (
        <div className="ingredient" key={ingredient.id}>
            <div className="headerIngredient">
                <p>{ingredient.name}</p>
            </div>
            <div className="footerIngredient">
                <input value={ingredient.count}/>
                <li onClick={Delete}>delete</li>
            </div>
        </div>
    );
};

export default IngredientItem;
