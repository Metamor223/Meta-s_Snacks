import { useState } from 'react';

export default function ProductList() {
  const [products] = useState([
    { 
      id: 1, 
      img: "/img/firstpackcracks.jpg", 
      name: 'Product 1', 
      category: 'Hazelnuts',
      description: 'Чипсы Lays с луком готовятся из натурального картофеля, который обжаривают в подсолнечном масле с добавлением специй. Состав: Картофель, растительное масло, ароматизатор (луковый порошок, соль, сахар, порошок молочной сыворотки, усилители вкуса и аромата (глутамат натрия 1 - замещенный, 5 - рибонуклеотиды натрия 2 - замещенные), сухое обезжиренное молоко, лактоза (из молока), вкусоароматические вещества, сырный порошок, регулятор кислотности (лимонная кислота), краситель (аннато), чесночный порошок). Пищевая ценность на 100 г продукта: белки - 6,5 г, жиры - 30 г, углеводы - 53 г. Энергетическая ценность на 100 г продукта: 510 ккал. Вес: 80 г. Условия хранения: при температуре не выше 20 °С.', 
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
