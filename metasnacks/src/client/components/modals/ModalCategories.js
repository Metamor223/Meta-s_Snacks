import React, {useState} from 'react';
import "./modal.css";
import {createType} from "../../http/productAPI";
import AddCategories from "../AddDeleteEdit/AddCategories";
import DeleteCategories from "../AddDeleteEdit/DeleteCategories";
import {observer} from "mobx-react-lite";

const ModalCategories = ({active,setActive}) => {
    const [action, setAction] = useState(null); // Состояние для отслеживания текущего действия в модальном окне

    const handleActionChange = (newAction) => {
        setAction(newAction); // Обновляем состояние текущего действия
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e=>e.stopPropagation()}>
                <h2>Categories editing window</h2>
                <div className="optionsOfDataBase">
                    <li onClick={() => handleActionChange('ADD')}>Add</li>
                    <li onClick={() => handleActionChange('DELETE')}>Delete</li>
                </div>
                {action === 'ADD' && (
                    <AddCategories setActive={setActive} />
                )}
                {action === 'DELETE' && (
                    <DeleteCategories setActive={setActive}/>
                )}
            </div>
        </div>
    );
};

export default ModalCategories;
