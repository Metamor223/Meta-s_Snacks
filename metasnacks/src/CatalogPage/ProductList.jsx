import { useState } from 'react';

export default function ProductList() {
  const [products] = useState([
    { 
      id: 1, 
      img: "/img/firstpackcracks.jpg", 
      name: 'Product 1', 
      category: 'Hazelnuts', 
      price: '10$'
    },
    { 
      id: 2, 
      img: "/img/secondpackcracks.png", 
      name: 'Product 2', 
      category: 'Hazelnuts', 
      price: '20$'
    },
    { 
      id: 3, 
      img: "/img/secondpackcracks.png", 
      name: 'Product 3', 
      category: 'Crackers', 
      price: '30$'
    },
    { 
      id: 4, 
      img: "/img/secondpackcracks.png", 
      name: 'Product 4', 
      category: 'Chips', 
      price: '40$'
    },
    { 
      id: 5, 
      img: "/img/secondpackcracks.png", 
      name: 'Product 5', 
      category: 'Crackers', 
      price: '40$'
    },
    { 
      id: 6, 
      img: "/img/secondpackcracks.png", 
      name: 'Product 6', 
      category: 'Crackers', 
      price: '40$'
    },
    // ...
  ]);

  return products;
}
