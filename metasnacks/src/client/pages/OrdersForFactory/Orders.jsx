import React, {useContext, useEffect, useState} from 'react';
import './Orders.css';
import ModalOrders from "../../components/modals/ModalOrders";
import {editOrder, fetchOrders, fetchStatus} from "../../http/orderAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchWarehouse} from "../../http/warehouseAPI";

const Orders = observer(() => {

    const {order} = useContext(Context)

    const[selectedStatus, setSelectedStatus] = useState({})

    const refetchData = () => {
        fetchOrders().then(data=>{
            order.setOrder(data);

            // Create an object to store the initial selected statuses
            const initialSelectedStatuses = {};

            // Iterate through the fetched orders
            data.forEach((orderItem) => {
                // Set the initial selected status for each order
                initialSelectedStatuses[orderItem.id] = orderItem.statusId;
            });

            // Update the state with the initial selected statuses
            setSelectedStatus(initialSelectedStatuses);
        })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });

        fetchStatus()
            .then((data) => order.setStatus(data))
            .catch((error) => {
                console.error('Error fetching statuses:', error);
            })
    }

    useEffect(() => {
        refetchData()
    }, []);

    const changeOrder = async (orderId, newStatusId) => {
        console.log("Номер заказа:",orderId, "Статус id", newStatusId)
        const updates = { id: orderId, statusId: newStatusId };
        const orderIndex = order.order.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            order.order[orderIndex].statusId = newStatusId;
        }
        return editOrder(updates);
    }

    return(
    <div className="OrdersContainer">
        <h3>Форма для добавления заказа</h3>
        <ModalOrders refetchData = {refetchData}/>
        <h3>Список заказов</h3>
          <table>
              <thead>
                <tr>
                    <th>Номер заказа</th>
                    <th>Компания</th>
                    <th>Заказ</th>
                    <th>Дата заказа</th>
                    <th>Цена</th>
                    <th>Статус</th>
                </tr>
              </thead>
                <tbody>
                {order.order.map(orderItem=>
                    <tr key={orderItem.id}>
                        <td>{orderItem.id}</td>
                        <td>{orderItem.CompanyName}</td>
                        <td>{orderItem.detailsOrder}</td>
                        <td>{new Date(orderItem.orderDate).toLocaleDateString()}</td>
                        <td>{orderItem.price} р</td>
                        <td>
                            {Array.isArray(order.status) ? (
                            <select
                                value={selectedStatus[orderItem.id] || ''}
                                onChange={(e) => {
                                    const newStatusId = Number(e.target.value);
                                    setSelectedStatus((prevStatuses) => ({
                                        ...prevStatuses,
                                        [orderItem.id]: newStatusId
                                    }));

                                    changeOrder(orderItem.id, newStatusId)
                                        .then(() => {
                                            refetchData();
                                        })
                                        .catch((error) => {
                                            console.error('Ошибочка', error);
                                        });
                                }}
                            >
                                {order.status.map(status=>
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                )}
                            </select>
                                ) : (<p> Loading statuses</p>)}
                        </td>
                    </tr>
                )}
                </tbody>
          </table>
    </div>
    )
})

export default Orders;