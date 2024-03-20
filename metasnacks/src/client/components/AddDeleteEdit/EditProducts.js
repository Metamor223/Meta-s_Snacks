import React, {useState, useEffect, useContext} from 'react';
import { fetchProducts } from '../../http/productAPI';
import ProductList from '../ProductList';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

const EditProducts = observer(({setActive}) => {

    const {product} = useContext(Context)

    const [editingProduct, setEditingProduct] = useState(false);

    const [name,setName] = useState('')
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)

    if (!Array.isArray(product.typeProduct)) {
        return null;
    }

    useEffect(() => {
        fetchProducts().then(data=>product.setProduct(data.rows));
    }, []);

    const editProduct = () => {
        setEditingProduct(true);
    };

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const SaveProduct = () =>{
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
        changeProduct(formData).then(data => setActive())
    }

    const editForm = (
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
                    <li onClick={setActive}>Close window</li>
                    <li onClick={SaveProduct}>Save changes</li>
                </div>
            </form>
        </div>
    )

    return (
        <div>
            <div className="SelectionProduct">
                <ProductList/>
                <li onClick={editProduct}>Edit product</li>
            </div> 
            
            {editingProduct ? editForm : null}
        </div>
    );
});

export default EditProducts;