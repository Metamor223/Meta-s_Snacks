import React, {useContext, useEffect}from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteProduct, fetchPtoducts} from "../../http/productAPI";

const DeleteProducts = observer(({setActive}) => {
    const {product} = useContext(Context)
    
    useEffect(() => {
        fetchProducts().then(data => product.setProduct(data.rows));
    }, []);
    
    const DeleteProduct = () =>{
        const productId = product.product.id
        deleteProduct(productId)
            .then(data=>{setActive()})
            .catch(error=>{console.error('Error deleting product:', error)})
    }
    
    return (
    <>
        <h2>Select product, which you are want delete</h2>
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
                    <li onClick={DeleteProduct}>Delete product</li>
        </div>
    </>
    );
});

export default DeleteProducts;
