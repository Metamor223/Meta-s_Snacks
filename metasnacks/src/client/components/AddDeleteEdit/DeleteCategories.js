import React, {useContext, useEffect} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {createType, deleteType, fetchTypes} from "../../http/productAPI";

const DeleteCategories = observer(({setActive}) => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data=>product.setTypeProduct(data));
    }, []);

    if (!Array.isArray(product.typeProduct)) {
        return null;
    }

    const DeleteCategory = () =>{
        const typeId = product.selectedType.id
        deleteType(typeId)
            .then(data=>{setActive()})
            .catch(error=>{console.error('Error deleting category:', error)})
    }

    return (
        <div className="modalForm">
            <h2>Select category, which you are want delete</h2>
            <div className="category">
                <ul>
                {product.typeProduct.map(type=>
                    <li
                        className={type.id === product.selectedType.id ? "ListItem active" : "ListItem"}
                        onClick={()=> product.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name_type}
                    </li>
                )}
                </ul>
            </div>
            <div className="ModalsButton">
                <li>Close window</li>
                <li onClick={DeleteCategory}>Delete category</li>
            </div>
        </div>
    );
});

export default DeleteCategories;