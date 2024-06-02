import React, {useState} from 'react';
import ProductPageInfo from "../../pages/CatalogPage/ProductPageInfo";
import {useParams} from "react-router-dom";
import Feedback from "../../pages/ChatPage/Feedback";
import {addToBasket} from "../../http/productAPI";

const ProductItem = ({product}) => {

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
                    </div>
                </div>
        </div>
    );
};

export default ProductItem;