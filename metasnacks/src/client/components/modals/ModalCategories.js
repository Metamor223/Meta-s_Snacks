import React, {useState} from 'react';
import "./modal.css";
import {createType} from "../../http/productAPI";

const ModalCategories = ({active,setActive}) => {
    const [value, setValue] = useState('')
    const addCategory = () =>{
        createType({name_type:value}).then(data=>{setValue('')})
        setActive()
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e=>e.stopPropagation()}>
                <h2>Categories editing window</h2>
                <div className="optionsOfDataBase">
                    <li>Add</li>
                    <li>Edit</li>
                    <li>Delete item</li>
                </div>
                <div className="CategorieInput">
                    <input
                        placeholder="Enter categorie name"
                        value={value}
                        onChange={e => setValue(e.target.value)}/>
                </div>
                <div className="ModalsButton">
                    <li onClick={setActive}>Close window</li>
                    <li onClick={addCategory}>Add product</li>
                </div>
            </div>
        </div>
    );
};

export default ModalCategories;