import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ProductItem from "./ProductItem";

const ProductList = observer(({showAddToCartButton}) => {

    const {product} = useContext(Context)

 // Проверяем, является ли product.typeProduct массивом перед вызовом метода map
    return (
        <>
            {product.product.map(product=>
            <ProductItem key={product.id} product={product}/>
            )}
        </>
    );
});

export default ProductList;