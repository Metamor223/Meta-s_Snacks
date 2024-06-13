import React, {useState} from 'react';
import AddManager from "../AddDeleteEdit/AddManager";
import ListManagers from "../AddDeleteEdit/ListManagers";
import "./modal.css";

const ModalUsers = ({active,setActive}) => {

    const [action, setAction] = useState(null);
    const handleActionChange = (newAction) => {
        setAction(newAction); // Обновляем состояние текущего действия
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e=>e.stopPropagation()}>
                <div className="optionsOfDataBase">
                    <li onClick={() => handleActionChange('ADD')}>Добавить менеджера</li>
                    <li onClick={() => handleActionChange('DELETE')}>Список менеджеров</li>
                </div>
                {action === 'ADD' && (
                    <AddManager setActive={setActive} />
                )}
                {action === 'DELETE' && (
                    <ListManagers setActive={setActive}/>
                )}
            </div>
        </div>
    );
};

export default ModalUsers;