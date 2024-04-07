// Catalog.js
import React, {useState, useEffect, useContext} from 'react';
import './catalog.css';
import ProductPageInfo from './ProductPageInfo';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {fetchProducts, fetchTypes} from "../../http/productAPI";
import TypeBar from "../../components/TypeBar";
import ProductList from "../../components/ProductList";
import Pages from "../../components/Pages";

const Catalog = observer(()=> {
  const [searchQuery, setSearchQuery] = useState("");

  const {product} = useContext(Context)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterProducts = () => {
    let filteredProducts = product;

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
    fetchTypes().then(data=>product.setTypeProduct(data));
    fetchProducts(null,8, product.page).then(data=> {
      product.setProduct(data.rows)
      product.setTotalCount(data.count)
    });
  }, []);

  useEffect(() => {
    fetchProducts(product.selectedType.id,8, product.page).then(data=> {
      product.setProduct(data.rows)
      product.setTotalCount(data.count)
    });
  }, [product.page,product.selectedType]);

  return (
    <div className="catalogAppearance">
      <div className="categories">
        <input type="text" placeholder="Search on catalog" value={searchQuery} onChange={handleSearchChange}/>
        <label>Choose category:</label>
        <ul>
         <TypeBar/>
        </ul>
      </div>
      <ul>
        <ProductList />
      </ul>
      <Pages/>
    </div>
  );
})

export default Catalog