import React, {useState} from 'react';
import ProductPageInfo from "../pages/CatalogPage/ProductPageInfo";
import {useParams} from "react-router-dom";

const ProductItem = ({product}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {id} = useParams()

    const handleItemClick = () => {
        setSelectedProduct(product)
        console.log(setSelectedProduct(product))
        setModalOpen(true);
    };

    const closeModal = () => {
        // Закрываем модальное окно
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
                     key={product.product_id}
                     onClick={handleItemClick}>
                    <div className="headerProduct">
                        <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '13vw' }}/>
                        <p>{product.Product_name}</p>
                    </div>
                    <div className="footerProduct">
                        <p>{product.price}р</p>
                        {/*добавить метод POST для добавления в orders без галки*/}
                        <li>Add to Cart</li>
                    </div>
                </div>
        </div>
    );
};

export default ProductItem;