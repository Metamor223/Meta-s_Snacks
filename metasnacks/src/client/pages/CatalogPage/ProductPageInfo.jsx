import './ProductPageInfo.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchOneProduct} from "../../http/productAPI";
import {observer} from "mobx-react-lite";


const ProductPageInfo = observer(({onClose, selectedProduct}) => {

    const [product, setProduct] = useState(selectedProduct);
    const {product_id} = useParams()

    useEffect(() => {
        if(product_id){
            fetchOneProduct(product_id).then(data => setProduct(data))
        }
    }, [product_id]);

  return (
    <div className="product-page-info">
      <div className="info-body">
            <div className="info-header">
                <h2>{product.Product_name}</h2>
                <button onClick={onClose}>X</button>
            </div>
        <img src={process.env.REACT_APP_META_SNACKS + "/" + product.image_path} alt={product.Product_name} style={{ width: '20vw' }}/>
            <div className="info-description">
                <p>Price: {product.price}</p>
                <p>Description :  <span>{product.description}</span></p>
            </div>
      </div>
    </div>
  );
})

export default ProductPageInfo
