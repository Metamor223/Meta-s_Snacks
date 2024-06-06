import React from 'react';


const ProductItemForWarehouse = ({product}) => {

    const handleChange = (e) => {
        product.count = e.target.value;
    };

    return (
            <div className={"product"}
                 key={product.id}>
                <div className="headerProduct">
                    <p>{product.name}</p>
                </div>
                <div className="footerProduct">
                    <p><input type="number" value={product.count} onChange={handleChange}/>шт</p>
                </div>
            </div>
    );
};

export default ProductItemForWarehouse;