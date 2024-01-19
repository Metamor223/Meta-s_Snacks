// Catalog.js
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './catalog.css';
import ProductPageInfo from './ProductPageInfo';

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = ProductList();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filterProducts = (products) => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(query)) ||
          (product.description && product.description.toLowerCase().includes(query))
      );
    }
    return filteredProducts;
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedProducts = filterProducts(products).slice(startIndex, endIndex);
    setDisplayedItems(slicedProducts);
  }, [currentPage, itemsPerPage, products, selectedCategory, searchQuery]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductInfo(true);
  };

  const handleCloseProductInfo = () => {
    setShowProductInfo(false);
  };

  return (
    <div className="catalogAppearance">
      {showProductInfo && (
        <div className="overlay" onClick={handleCloseProductInfo}></div>
      )}

      <div className="categories">
        <input type="text" placeholder="Search on catalog" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        <label>Choose category:</label>
        <ul>
          <li onClick={() => handleCategoryChange("")}>All categories</li>
          <li onClick={() => handleCategoryChange("Hazelnuts")}>Hazelnuts</li>
          <li onClick={() => handleCategoryChange("Chips")}>Chips</li>
          <li onClick={() => handleCategoryChange("Crackers")}>Crackers</li>
        </ul>
      </div>

      <ul>
        {displayedItems.map((product) => (
          <div className="product" key={product.id}>
            <li onClick={() => handleProductClick(product)}>
              <div className="headerProduct">
                <img src={product.img} alt={product.name} style={{ width: '13vw' }} />
                <p>{product.name}</p>
              </div>
              <div className="footerProduct">
                <p>{product.price}</p>
                <li onClick={() => addToCart(product)}>Add to Cart</li>
              </div>
            </li>
          </div>
        ))}
      </ul>

      {showProductInfo && (
        <ProductPageInfo product={selectedProduct} onClose={handleCloseProductInfo} />
      )}
    </div>
  );
}
