import React, {useState} from 'react';
import ProductPageInfo from "../pages/CatalogPage/ProductPageInfo";
import {useParams} from "react-router-dom";
import Cart from "../pages/CartPage/Cart";

const ProductItem = ({product, addToCart}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleItemClick = () => {
        setSelectedProduct(product)
        console.log(setSelectedProduct(product))
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
         <div>
             {modalOpen && selectedProduct &&
                 <ProductPageInfo
                     onClose={closeModal}
                     selectedProduct={selectedProduct}
                 />}
                <div className={"product"}
                     key={product.id}
                     onClick={handleItemClick}>
                    <div className="headerProduct">
                        <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '13vw' }}/>
                        <p>{product.Product_name}</p>
                    </div>
                    <div className="footerProduct">
                        <p>{product.price}р</p>
                        <li>Add to Cart</li>
                    </div>
                </div>
        </div>
    );
};

export default ProductItem;