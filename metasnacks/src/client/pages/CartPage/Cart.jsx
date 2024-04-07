import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneProduct, fetchProducts} from "../../http/productAPI";
import {observer} from "mobx-react-lite";

const Cart = observer(({ selectedProduct }) => {
  // Состояние корзины в компоненте Cart
  const [cart, setCart] = useState(selectedProduct || []);

    useEffect(() => {
        if (selectedProduct) {
            setCart([...cart, selectedProduct]);
            console.log('Cart Updated:', cart);
        }
    }, [selectedProduct,cart]);

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
})

export default Cart;