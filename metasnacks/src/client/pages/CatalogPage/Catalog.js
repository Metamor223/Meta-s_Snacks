// Catalog.js
import React, {useState, useEffect, useContext} from 'react';
import './catalog.css';
import ProductPageInfo from './ProductPageInfo';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {fetchProducts, fetchTypes} from "../../http/productAPI";
import TypeBar from "../../components/TypeBar";
import ProductList from "../../components/ProductFiles/ProductList";
import Pages from "../../components/Pages";

const Catalog = observer(()=> {
  const [searchQuery, setSearchQuery] = useState("");

  const {product} = useContext(Context)

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
        <label>Выбор категории:</label>
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