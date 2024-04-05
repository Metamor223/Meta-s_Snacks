import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {

    const {product} = useContext(Context)

    return (
        <>
            {product.product.map(product=>
            <ProductItem key={product.id} product={product}/>
            )}
        </>
    );
});

export default ProductList;