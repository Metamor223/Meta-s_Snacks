import React from 'react';
import './Orders.css';

export default function FactorysOrders({client, product, order}){
    return(
    <div className="OrdersContainer">
        <ul>
            <li>
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
                    <th>{order.id}</th>
                    <th>{client.id}</th>
                    <th>{product.id}</th>
                    <th>{product.amount}</th>
                    <th>{order.date}</th>
                    <th>{order.price}</th>
                </tr>
              </table>
            </li>
        </ul>
    </div>
    );
}