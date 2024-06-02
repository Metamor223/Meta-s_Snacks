import React, {useEffect, useState} from 'react';
import {deleteIngredient, fetchIngredient} from "../../http/warehouseAPI";
import {fetchProducts} from "../../http/productAPI";

const ProductItemForWarehouse = ({product}) => {

    const Delete = () =>{
        const Id = product.id
        deleteIngredient(Id)
            .then(()=>{
                useEffect(() => {
                    fetchIngredient().then(data =>{product.setProduct(data)})
                        .catch(error => {
                            console.error('Error fetching ingredient:', error);
                        });
                }, []);
            })
            .catch(error=>{console.error('Error deleting category:', error)})
    }

    return (
        <div>
            <div className={"product"}
                 key={product.id}>
                <div className="headerProduct">
                    <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '13vw' }}/>
                    <p>{product.Product_name}</p>
                </div>
                <div className="footerProduct">
                    <p>{product.count}</p>
                    <li onClick={Delete}>delete</li>
                </div>
            </div>
        </div>
    );
};

export default ProductItemForWarehouse;