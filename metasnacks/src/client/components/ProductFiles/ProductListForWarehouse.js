import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import ProductItemForWarehouse from "./ProductItemForWarehouse";

const ProductList = observer(() => {

    const {product} = useContext(Context)

    return (
        <>
            {product.product.map(product=>
                <ProductItemForWarehouse key={product.id} product={product}/>
            )}
        </>
    );
});

export default ProductList;