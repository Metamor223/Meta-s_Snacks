import React, { useState } from 'react';

export default function Cart({ cartItems }) {
  // Состояние корзины в компоненте Cart
  const [cart, setCart] = useState(cartItems || []);


  // Функция для удаления товара из корзины
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <div className="product" key={index}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            {/* Добавьте кнопку для удаления товара из корзины */}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
}