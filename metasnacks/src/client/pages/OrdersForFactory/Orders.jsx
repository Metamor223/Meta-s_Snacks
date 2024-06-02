import React, {useContext, useEffect} from 'react';
import './Orders.css';
import ModalOrders from "../../components/modals/ModalOrders";
import {fetchOrders} from "../../http/orderAPI";
import {Context} from "../../../index";

export default function Orders(){

    const {order} = useContext(Context)

    useEffect(() => {
        fetchOrders().then(data=>order.setStatus(data))
    }, []);

    return(
    <div className="OrdersContainer">
          <table>
              <tbody>
                <tr>
                    <th>Номер заказа</th>
                    <th>Компания</th>
                    <th>Заказ</th>
                    <th>Дата заказа</th>
                    <th>Цена</th>
                    <th>Статус</th>
                </tr>
                 <li className="AddInTable" onClick={() => ModalOrders({order} = order)}>PLUS</li>
                <ul>
                    <ModalOrders/>
                </ul>
                    <tr>
                        <td>1</td>
                        <td>Магнит</td>
                        <td>Chips 300шт. Сухарики 100шт.</td>
                        <td>2020.10.04</td>
                        <td>120000р</td>
                        <td><select name="" id=""></select></td>
                    </tr>
                </tbody>
          </table>
    </div>
    )
}