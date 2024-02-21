// Catalog.js
import React, {useState, useEffect, useContext} from 'react';
import './catalog.css';
import ProductPageInfo from './ProductPageInfo';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {fetchProducts, fetchTypes} from "../../http/productAPI";
import TypeBar from "../../components/TypeBar";
import ProductList from "../../components/ProductList";

const Catalog = observer(()=> {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {product} = useContext(Context)


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
          (product.name && product.name.toLowerCase().includes(query))
      );
    }
    return filteredProducts;
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    fetchTypes().then(data=>product.setTypeProduct(data));
    fetchProducts().then(data=>product.setProduct(data.rows));
  }, [currentPage, itemsPerPage, selectedCategory, searchQuery]);

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
         <TypeBar/>
        </ul>
      </div>

      <ul>
        <ProductList/>
      </ul>

      {showProductInfo && (
        <ProductPageInfo product={selectedProduct} onClose={handleCloseProductInfo} />
      )}
    </div>
  );
})

export default Catalog