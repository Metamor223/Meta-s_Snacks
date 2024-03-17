import React, {useState} from 'react';
import {createType} from "../../http/productAPI";
import ModalCategories from "../modals/ModalCategories";

const AddCategories = ({setActive}) => {
    const [value, setValue] = useState('')
    const addCategory = () =>{
        createType({name_type:value}).then(data=>{setValue('')})
        setActive()
    }

    return (
        <div className="FormCreate">
            <div className="CategorieInput">
                <input
                    placeholder="Enter categorie name"
                    value={value}
                    onChange={e => setValue(e.target.value)}/>
            </div>
            <div className="ModalsButton">
                <li onClick={setActive}>Close window</li>
                <li onClick={addCategory}>Add category</li>
            </div>
        </div>
    );
};

export default AddCategories;