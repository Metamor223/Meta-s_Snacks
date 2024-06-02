import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {createProduct} from "../../http/productAPI";
import {createOrder, fetchOrders} from "../../http/orderAPI";

const ModalOrders = ({order}) => {

    const [companyName, setCompanyName] = useState('')
    const [detailOrder, setDetailOrder] = useState('')
    const [dateOrder, setDateOrder] = useState('')
    const [price, setPrice] = useState(0)
    const [status, setStatus] = useState('')

    const addOrder = () => {
        const formData = new FormData()
        formData.append('CompanyName', companyName)
        formData.append('detailsOrder', detailOrder)
        formData.append('orderDate', dateOrder)
        formData.append('price', `${price}`)
        formData.append('statusId', status.id)
        // Создаем объект для хранения данных из formData
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject);
        createOrder(formData).then()
    }

    if (!Array.isArray(order.status)) {
        return null;
    }

    return (
        <>
            <form>
                <input
                    placeholder="Enter product name"
                    value={companyName}
                    onChange={e=> setCompanyName(e.target.value)}
                />
                <input
                    placeholder="Enter product description"
                    value={detailOrder}
                    onChange={e=> setDetailOrder(e.target.value)}
                />
                <input
                    placeholder="Enter product price"
                    value={price}
                    onChange={e=> setPrice(Number(e.target.value))}
                />
                <input
                    type='date'
                    placeholder="Enter product price"
                    value={dateOrder}
                    onChange={e=> setDateOrder(dateOrder)}
                />
                <select>
                    {order.status.map(status=>
                        <option
                            onClick={()=> order.setStatus(status)}
                            key={status.id}
                        >
                            {status.name}
                        </option>
                    )}
                </select>
                <div className="ModalsButton">
                    <li onClick={addOrder}>Add order</li>
                </div>
            </form>
        </>
    );
};

export default ModalOrders;