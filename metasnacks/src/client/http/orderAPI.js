import {$authHost} from "./index";

export const createOrder = async (order) =>{
    const {data} = await $authHost.post('api/order', order)
    return data
}

export const fetchOrders = async () =>{
    const {data} = await $authHost.get('api/order')
    return data
}