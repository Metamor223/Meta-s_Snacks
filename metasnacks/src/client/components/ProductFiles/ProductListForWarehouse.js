import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import ProductItemForWarehouse from "./ProductItemForWarehouse";

const ProductListForWarehouse = observer(() => {

    const {warehouse} = useContext(Context)

    return (
        <>
            {warehouse.warehouse.map(product=>
                <ProductItemForWarehouse key={product.id} product={product}/>
            )}
        </>
    );
});

export default ProductListForWarehouse;