import React, {useState, useEffect, useContext} from 'react';
import {fetchProducts} from '../../http/productAPI';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import EditFormProduct from "./EditFormProduct";
import {runInAction} from "mobx";

const EditProducts = observer(({setActive}) => {
    const {product} = useContext(Context);
    const [editingProduct, setEditingProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts().then(data => product.setProduct(data.rows));
    }, []);

    const editProduct = (prod) => {
        runInAction(() => {
            const productId = product.selectedProduct.product_id;
            setSelectedProduct(productId);
            setEditingProduct(true);
        });
    };

    return (
        <div>
            {editingProduct ? <EditFormProduct selectedProduct={selectedProduct}/> : (
                <div className="SelectionProduct">
                    <ul>
                        {product.product.map(prod => (
                            <div className="Fetch_product" key={prod.product_id}>
                                <li
                                    className={prod.product_id === product.selectedProduct.product_id ? "ListItem active" : "ListItem"}
                                    onClick={()=> editProduct(prod)}
                                    key={prod.product_id}
                                >
                                    <div className="headerProduct">
                                        <img src={process.env.REACT_APP_META_SNACKS + "/" + prod.image_path} alt={prod.Product_name} style={{ width: '10vw' }}/>
                                        <p>{prod.Product_name}</p>
                                    </div>
                                    <div className="footerProduct">
                                        <p>{prod.price}р</p>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                    <li onClick={editProduct} >Edit product</li>
                </div>
            )}
        </div>
    );
});

export default EditProducts;