import React, {useEffect, useState} from 'react';
import {changeProduct, fetchOneProduct, fetchProducts, fetchTypes} from "../../http/productAPI";
import {useParams} from "react-router-dom";

const EditFormProduct = ({setActive,selectedProduct}) => {

    const [product, setProduct] = useState(selectedProduct)
    const { product_id } = useParams();

    const [name,setName] = useState('')
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [typesLoading, setTypesLoading] = useState(true); // Track loading state

    if (selectedProduct && Array.isArray(product.typeProduct)) {
        return null;
    }

    useEffect(() => {
        fetchTypes()
            .then(data => {
                setProduct(prevProduct => ({ ...prevProduct, typeProduct: data }));
            })
            .finally(() => setTypesLoading(false));
        if(product_id) {
            fetchOneProduct(product_id).then(data => setProduct(data))
        }
    }, [product_id]);

    useEffect(() => {
        try {
            if (selectedProduct && Array.isArray(product.typeProduct)) {
                setName(selectedProduct.Product_name);
                setDescription(selectedProduct.description);
                setPrice(selectedProduct.price);
                setFile(selectedProduct.image_path);
                setSelectedTypeId(selectedProduct.typeId)
            }
        } catch (e) {
            console.error("Ошибка при обновлении состояния формы:",e)
        }
    }, [selectedProduct,product.typeProduct]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const SaveProduct = () => {
        const formData2 = new FormData();
        formData2.append('Product_name', name);
        formData2.append('image_path', file);
        formData2.append('typeId', selectedTypeId);
        formData2.append('description', description);
        formData2.append('price', `${price}`);
        const formDataObject = {};
        for (const [key, value] of formData2.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject);
        changeProduct(formData2).then(data => setActive());
    };

    return (
            <div className="FormCreate">
                {typesLoading ? ( // Show a loading indicator while fetching types
                    <div>Loading form...</div>
                ) : (
                <form>
                    <h2>Change Product</h2>
                    <input
                        placeholder="Enter product name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="file" id="fileInput" onChange={selectFile}/>
                    <p>Select product category:
                        <select
                            value={selectedTypeId !== null ? selectedTypeId : ''}
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
                        placeholder="Enter product description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Enter product price"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <div className="ModalsButton">
                        <li onClick={setActive}>Close window</li>
                        <li onClick={SaveProduct}>Save changes</li>
                    </div>
                </form>
                )}
            </div>
    );
};

export default EditFormProduct;