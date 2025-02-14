import React, {useContext, useEffect, useState} from 'react';
import "./modal.css";
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
                <h2>Окно изменений продуктов</h2>
                <div className="optionsOfDataBase">
                    <li onClick={() => handleActionChange('ADD')}>Добавить</li>
                    {/*<li onClick={() => handleActionChange('EDIT')}>Edit</li>*/}
                    <li onClick={() => handleActionChange('DELETE')}>Удалить</li>
                </div>
                {action === 'ADD' && (
                    <AddProducts setActive={setActive} />
                )}
                {/*{action === 'EDIT' && (*/}
                {/*    <EditProducts setActive={setActive}/>*/}
                {/*)}*/}
                {action === 'DELETE' && (
                    <DeleteProducts setActive={setActive}/>
                )}
            </div>
        </div>
    );
};

export default ModalProducts;