import {$authHost} from "./index";

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order', order)
    return data
}

export const fetchOrders = async () => {
    const {data} = await $authHost.get('api/order')
    return data
}

export const fetchStatus = async () => {
    const {data} = await $authHost.get('api/order/status')
    return data
}

export const editOrder = async (updates) =>{
    console.log("Номер заказа:", updates);
    const {data} = await $authHost.put('api/order/',{updates: updates})
    return data
}