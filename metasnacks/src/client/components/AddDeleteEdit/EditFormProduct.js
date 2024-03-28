import React, {useEffect, useState} from 'react';
import {changeProduct, fetchOneProduct, fetchProducts, fetchTypes} from "../../http/productAPI";
import {useParams} from "react-router-dom";

const EditFormProduct = ({setActive,selectedProduct}) => {

    const [product, setProduct] = useState(selectedProduct)

    const [name,setName] = useState('')
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)

    const {id} = useParams()

    useEffect(() => {
        fetchTypes().then(data=>product.setProduct({...product, typeProduct: data}));
        if(id){
            fetchOneProduct(id).then(data => setProduct(data))
        }

    }, [id,product]);

    useEffect(() => {
        if(selectedProduct){
            setName(selectedProduct.Product_name);
            setDescription(selectedProduct.description);
            setPrice(selectedProduct.price);
            setFile(selectedProduct.image_path);
        }
    }, [selectedProduct]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const SaveProduct = () => {
        const formData2 = new FormData();
        formData2.append('Product_name', name);
        formData2.append('image_path', file);
        formData2.append('typeofproductId', product.selectedType.id);
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
                <form>
                    <h2>Change Product</h2>
                    <input
                        placeholder="Enter product name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="file" id="fileInput" onChange={selectFile}/>
                    <p>Select product category:
                        <select>
                            {product.typeProduct && (
                                <option
                                    onClick={() => product.setSelectedType({...product, selectedType: product.typeProduct})}
                                    key={product.typeProduct.id}
                                >
                                    {product.typeProduct.name_type}
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
            </div>
    );
};

export default EditFormProduct;