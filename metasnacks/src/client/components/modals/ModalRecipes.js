import React, {useState} from 'react';
import "./modal.css";
import AddProducts from "../AddDeleteEdit/AddProducts";
import EditProducts from "../AddDeleteEdit/EditProducts";
import DeleteProducts from "../AddDeleteEdit/DeleteProducts";
import AddRecepies from "../AddDeleteEdit/AddRecepies";
import DeleteRecepies from "../AddDeleteEdit/DeleteRecepies";
const ModalRecipes = ({active,setActive}) => {

    const [action, setAction] = useState(null);
    const handleActionChange = (newAction) => {
        setAction(newAction); // Обновляем состояние текущего действия
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e=>e.stopPropagation()}>
                <h2>Recipes editing window</h2>
                <div className="optionsOfDataBase">
                    <li onClick={() => handleActionChange('ADD')}>Add</li>
                    <li onClick={() => handleActionChange('EDIT')}>Edit</li>
                    <li onClick={() => handleActionChange('DELETE')}>Delete</li>
                </div>
                {action === 'ADD' && (
                    <AddRecepies setActive={setActive} />
                )}
                {action === 'EDIT' && (
                    <EditProducts setActive={setActive}/>
                )}
                {action === 'DELETE' && (
                    <DeleteRecepies setActive={setActive}/>
                )}
            </div>
        </div>
    );
};

export default ModalRecipes;