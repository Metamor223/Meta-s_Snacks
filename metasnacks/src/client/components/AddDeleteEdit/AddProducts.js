import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {createProduct, fetchTypes} from "../../http/productAPI";
import {observer} from "mobx-react-lite";

const AddProducts = observer(({setActive}) => {
    const {product} = useContext(Context)

    const [name,setName] = useState('')
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [typesLoading, setTypesLoading] = useState(true); // Track loading state

    if (!Array.isArray(product.typeProduct)) {
        return null;
    }

    useEffect(() => {
        fetchTypes()
            .then(data => {
                product.setTypeProduct(data);
            })
            .finally(() => setTypesLoading(false)); // Mark loading as done
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {

        if (selectedTypeId === null) {
            alert("Please select a product type.");
            return;
        }

        const formData = new FormData()
        formData.append('Product_name', name)
        formData.append('image_path', file)
        formData.append('typeId', selectedTypeId)
        formData.append('description', description)
        formData.append('price', `${price}`)
        // Создаем объект для хранения данных из formData
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject);
        createProduct(formData)
            .then(data => {
                console.log("Product created successfully:", data);
                setActive();
            })
            .catch(error => {
                console.error("Error creating product:", error);
                console.log("Error response:", error.response);
                // Display a user-friendly error message to the user
            });
    }

    return (
        <div className="FormCreate">
            {typesLoading ? ( // Show a loading indicator while fetching types
                <div>Loading form...</div>
            ) : (
            <form>
                <input
                    placeholder="Введите название продукта"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                />
                <input type="file" id="fileInput" onChange={selectFile}/>
                <p>Выберите категорию для продукта:
                    <select
                        value={selectedTypeId}
                        onChange={e => setSelectedTypeId(Number(e.target.value))}
                        >
                        {product.typeProduct.map(type=>
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        )}
                    </select>
                </p>
                <input
                    placeholder="Введите описание продукта"
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                />
                <input
                    placeholder="Введите цену продукта"
                    value={price}
                    onChange={e=> setPrice(Number(e.target.value))}
                />
                <div className="ModalsButton">
                    <li onClick={setActive}>Закрыть окно</li>
                    <li onClick={addProduct}>Добавить продукт</li>
                </div>
            </form>
                )}
        </div>
    );
});

export default AddProducts;