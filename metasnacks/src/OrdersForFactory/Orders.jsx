import React from 'react';
import './Orders.css';

export default function Orders({client, product, order}){
    return(
    <div className="OrdersContainer">
              <table>
                <tr>
                    <th>Номер заказа</th>
                    <th>Номер пользователя</th>
                    <th>Номер товара</th>
                    <th>Количество продуктов</th>
                    <th>Дата заказа</th>
                    <th>Цена</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>4</td>
                    <td>3</td>
                    <td>2020.10.04</td>
                    <td>30000$</td>
                </tr>
              </table>
              <button></button>
    </div>
    )
}