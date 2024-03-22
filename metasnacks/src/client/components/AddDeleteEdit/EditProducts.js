import React, {useState, useEffect, useContext} from 'react';
import {fetchProducts, changeProduct, fetchOneProduct} from '../../http/productAPI';
import ProductList from '../ProductList';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { useParams} from "react-router-dom";
import EditFormProduct from "./EditFormProduct";

const EditProducts = observer(({setActive}) => {
    const {product} = useContext(Context);
    const [editingProduct, setEditingProduct] = useState(false);

    useEffect(() => {
        fetchProducts().then(data => product.setProduct(data.rows));
    }, []);

    const editProduct = (product) => {
        setSelectedProduct(product);
        setEditingProduct(true);
    };

    return (
        <div>
            {editingProduct ? <EditFormProduct/> : (
                <div className="SelectionProduct">
                    <ul>
                        {product.product.map(product => (
                            <div className="product" key={product.product_id}>
                                <div className="headerProduct">
                                    <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '13vw' }}/>
                                    <p>{product.Product_name}</p>
                                </div>
                                <div className="footerProduct">
                                    <p>{product.price}р</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <li onClick={editProduct}>Edit product</li>
                </div>
            )}
        </div>
    );
});

export default EditProducts;