import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProductList = observer(() => {

    const {product} = useContext(Context)
 // Проверяем, является ли product.typeProduct массивом перед вызовом метода map
 if (!Array.isArray(product.product)) {
    return null; // или другое поведение по умолчанию
}
    return (
        <>
            {product.product.map(product => (
                <div className="product" key={product.id}>
                    <li >
                        <div className="headerProduct">
                            <img src={product.img} alt={product.name} style={{ width: '13vw' }} />
                            <p>{product.name}</p>
                        </div>
                        <div className="footerProduct">
                            <p>{product.price}</p>
                            <li>Add to Cart</li>
                        </div>
                    </li>
                </div>
            ))}
        </>
    );
});

export default ProductList;