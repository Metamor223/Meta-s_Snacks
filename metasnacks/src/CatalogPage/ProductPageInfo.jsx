import './ProductPageInfo.css';

export default function ProductPageInfo({ product, onClose }) {
  return (
    <div className="product-page-info">
      <div className="info-body">
            <div className="info-header">
                <h2>{product.name}</h2>
                <button onClick={onClose}>X</button>
            </div>
        <img src={product.img} alt={product.name} style={{ width: '17vw' }}/>
            <div className="info-description">
                <p><span>Price product :</span> {product.price}</p>
                <p><span>Description :</span> {product.description}</p>        
            </div>
      </div>
    </div>
  );
}
