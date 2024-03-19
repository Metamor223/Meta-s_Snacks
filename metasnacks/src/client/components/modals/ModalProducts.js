import React, {useContext, useEffect, useState} from 'react';
import "./modal.css";
import {createProduct, fetchTypes} from "../../http/productAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import AddCategories from "../AddDeleteEdit/AddCategories";
import AddProducts from "../AddDeleteEdit/AddProducts";
import EditProducts from "../AddDeleteEdit/EditProducts";
import DeleteProducts from "../AddDeleteEdit/DeleteProducts";

const ModalProducts = ({active,setActive}) => {

    const [action, setAction] = useState(null);
    const handleActionChange = (newAction) => {
        setAction(newAction); // Обновляем состояние текущего действия
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e=>e.stopPropagation()}>
                <h2>Product editing window</h2>
                <div className="optionsOfDataBase">
                    <li onClick={() => handleActionChange('ADD')}>Add</li>
                    <li onClick={() => handleActionChange('EDIT')}>Edit</li>
                    <li onClick={() => handleActionChange('DELETE')}>Delete</li>
                </div>
                {action === 'ADD' && (
                    <AddProducts setActive={setActive} />
                )}
                {action === 'EDIT' && (
                    <EditProducts setActive={setActive}/>
                )}
                {action === 'DELETE' && (
                    <DeleteProducts setActive={setActive}/>
                )}
            </div>
        </div>
    );
};

export default ModalProducts;