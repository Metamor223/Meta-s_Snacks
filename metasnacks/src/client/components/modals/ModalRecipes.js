import React, {useState} from 'react';
import "./modal.css";
const ModalRecipes = ({active,setActive}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e=>e.stopPropagation()}>
                <h2>Recipes editing window</h2>
                <div className="optionsOfDataBase">
                    <li>Add</li>
                    <li>Edit</li>
                    <li>Delete item</li>
                </div>
            </div>
        </div>
    );
};

export default ModalRecipes;