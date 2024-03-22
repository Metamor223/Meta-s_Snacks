import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProductList = observer(({showAddToCartButton}) => {

    const {user, product} = useContext(Context)

 // Проверяем, является ли product.typeProduct массивом перед вызовом метода map
    return (
        <>
            {product.product.map(product => (
                <div className={`product ${user.isAuth ? 'admin' : ""}`} key={product.product_id}>
                        <div className="headerProduct">
                            <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '13vw' }}/>
                            <p>{product.Product_name}</p>
                        </div>
                        <div className="footerProduct">
                            <p>{product.price}р</p>
                            <li>Add to Cart</li>

                        </div>
                </div>
            ))}
        </>
    );
});

export default ProductList;