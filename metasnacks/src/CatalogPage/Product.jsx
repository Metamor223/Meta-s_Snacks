import React from 'react';
import './catalog.css';
import { useOutletContext } from 'react-router-dom';

export default function Product(product) {
  
  return (
    <>
    <div >
        <p>{product.img}</p>
        <p>{product.name}</p>
        <p>{product.description}</p>
    </div>
    <div className="footerProduct">
        <p>{product.price}</p>
        <input type="submit" value="+"/>
    </div>
    </>
  )
}