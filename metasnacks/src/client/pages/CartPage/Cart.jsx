import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneProduct, fetchProducts} from "../../http/productAPI";

export default function Cart({ selectedProduct }) {
  // Состояние корзины в компоненте Cart
  const [cart, setCart] = useState(selectedProduct || []);

    const [product, setProduct] = useState(selectedProduct);
    const {product_id} = useParams()

    useEffect(() => {
            fetchProducts().then(data => setProduct(data))
    }, []);

    //нужна функция для доставания из orders

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <div className="product" key={index}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            {/* Добавьте кнопку для удаления товара из корзины */}
            <button>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
}