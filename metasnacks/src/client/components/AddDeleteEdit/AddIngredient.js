import React, {useState} from 'react';
import {createIngredient} from "../../http/warehouseAPI";

const AddIngredient = () => {

    const [name,setName] = useState('')
    const [count,setCount] = useState(0)

    const Create = () =>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('count', `${count}`)
        createIngredient(formData).then(data=>{
            setName('');
            setCount(0);
        })
    }

    return (
        <form>
            <div className="CategorieInput">
                <p> Enter ingredient name
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </p>
            </div>
            <p> Enter Ingredient count, if you have
                <input
                    value={count}
                    onChange={e => setCount(Number(e.target.value))}
                />
            </p>
                <button onClick={Create}>Add ingredient</button>
        </form>
);
};

export default AddIngredient;