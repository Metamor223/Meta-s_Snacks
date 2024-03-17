import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {createProduct, fetchTypes} from "../../http/productAPI";

const AddProducts = ({setActive}) => {
    const {product} = useContext(Context)

    const [name,setName] = useState('')
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)

    if (!Array.isArray(product.typeProduct)) {
        return null;
    }

    useEffect(() => {
        fetchTypes().then(data => product.setTypeProduct(data))
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('Product_name', name)
        formData.append('image_path', file)
        formData.append('typeofproductId', product.selectedType.id)
        formData.append('description', description)
        formData.append('price', `${price}`)
        // Создаем объект для хранения данных из formData
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }

        console.log(formDataObject);
        createProduct(formData).then(data => setActive())
    }

    return (
        <div className="FormCreate">
            <form>
                <input
                    placeholder="Enter product name"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                />
                <input type="file" id="fileInput" onChange={selectFile}/>
                <p>Select product category:
                    <select>
                        {product.typeProduct.map(type=>
                            <option
                                onClick={()=> product.setSelectedType(type)}
                                key={type.id}
                            >
                                {type.name_type}
                            </option>
                        )}
                    </select>
                </p>
                <input
                    placeholder="Enter product description"
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                />
                <input
                    placeholder="Enter product price"
                    value={price}
                    onChange={e=> setPrice(Number(e.target.value))}
                />
                <div className="ModalsButton">
                    <li>Close window</li>
                    <li onClick={addProduct}>Add product</li>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;