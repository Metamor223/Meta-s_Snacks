import './ProductPageInfo.css';

export default function ProductPageInfo({ product, onClose }) {
  return (
    <div className="product-page-info">
      <div className="info-body">
            <div className="info-header">
                <h2>{product.name}</h2>
                <button onClick={onClose}>X</button>
            </div>
        <img src={product.img} alt={product.name} style={{ width: '20vw' }}/>
            <div className="info-description">
                <p>Price: {product.price}</p>
                <button>Add to Cart</button>
                <p>Description :  <span>{product.description}</span></p>        
            </div>
            
      </div>
    </div>
  );
}
