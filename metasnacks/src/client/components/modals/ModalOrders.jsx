import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {createOrder, fetchOrders, fetchStatus} from "../../http/orderAPI";

const ModalOrders = ({refetchData}) => {

    const {order} = useContext(Context)

    if (!Array.isArray(order.status)) {
        return null;
    }

    const [companyName, setCompanyName] = useState('')
    const [detailOrder, setDetailOrder] = useState('')
    const [dateOrder, setDateOrder] = useState('')
    const [price, setPrice] = useState(0)
    const [selectedStatus, setSelectedStatus] = useState(null)

    const addOrder = () => {
        const formData = new FormData()
        formData.append('CompanyName', companyName)
        formData.append('detailsOrder', detailOrder)
        formData.append('orderDate', dateOrder)
        formData.append('price', `${price}`)
        formData.append('statusId', selectedStatus)
        // Создаем объект для хранения данных из formData
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject);
        createOrder(formData).then()
        refetchData();
    }

    if (!Array.isArray(order.status)) {
        return null;
    }

    return (
        <div className="ModalOrder">
            <form>
                <input
                    placeholder="Введите название компании"
                    value={companyName}
                    onChange={e=> setCompanyName(e.target.value)}
                />
                <input
                    placeholder="Введите детали заказа"
                    value={detailOrder}
                    onChange={e=> setDetailOrder(e.target.value)}
                />
                <p> Стоимость заказа
                <input
                    placeholder=""
                    value={price}
                    onChange={e=> setPrice(Number(e.target.value))}
                />
                </p>
                <p> Дата заказа
                <input
                    type='date'
                    placeholder="Enter product dating"
                    value={dateOrder}
                    onChange={e=> setDateOrder(e.target.value)}
                />
                </p>
                <select value={selectedStatus}
                        onChange={e=>setSelectedStatus(Number(e.target.value))}>
                    {order.status.map(status=>
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    )}
                </select>
                    <li onClick={addOrder}>Добавить заказ</li>
            </form>
        </div>
    );
};

export default ModalOrders;