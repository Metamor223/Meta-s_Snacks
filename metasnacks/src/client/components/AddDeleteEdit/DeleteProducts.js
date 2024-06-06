import React, {useContext, useEffect}from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteProduct, fetchProducts} from "../../http/productAPI";
import {runInAction} from "mobx";

const DeleteProducts = observer(({setActive}) => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchProducts().then(data => product.setProduct(data.rows));
    }, []);
    
    const DeleteProduct = () =>{
        runInAction(() => {
            const productId = product.selectedProduct.product_id;
            deleteProduct(productId)
                .then(data => { setActive(); })
                .catch(error => { console.error('Error deleting product:', error); });
        });
    }
    
    return (
    <div className="modalForm">
        <h3>Select product, which you are want delete</h3>
        <div className="SelectionProduct">
            <ul>
                {product.product.map(prod => (
                    <div className="Fetch_product">
                        <li
                            className={prod.product_id === product.selectedProduct.product_id ? "ListItem active" : "ListItem"}
                            onClick={()=> product.setSelectedProduct(prod)}
                            key={prod.product_id}
                        >
                            <div className="headerProduct">
                                <img src={process.env.REACT_APP_META_SNACKS + "/" + prod.image_path} alt={prod.Product_name} style={{ width: '13vw' }}/>
                                <p>{prod.Product_name}</p>
                            </div>
                            <div className="footerProduct">
                                <p>{prod.price}р</p>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>

            <li onClick={DeleteProduct}>Delete product</li>
        </div>
    </div>
    );
});

export default DeleteProducts;
