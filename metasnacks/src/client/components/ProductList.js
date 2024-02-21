import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProductList = observer(() => {

    const {product} = useContext(Context)
 // Проверяем, является ли product.typeProduct массивом перед вызовом метода map
    return (
        <>
            {product.product.map(product => (
                <div className="product" key={product.product_id}>
                    <li >
                        <div className="headerProduct">
                            <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '13vw' }}/>
                            <p>{product.Product_name}</p>
                        </div>
                        <div className="footerProduct">
                            <p>{product.price}р</p>
                            <li>Add to Cart</li>
                        </div>
                    </li>
                </div>
            ))}
        </>
    );
});

export default ProductList;