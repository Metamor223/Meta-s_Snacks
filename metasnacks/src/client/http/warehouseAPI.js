import {$authHost} from "./index";

export const createIngredient = async (product) =>{
    const {data} = await $authHost.post('api/warehouse', product)
    return data
}

export const fetchIngredient = async () =>{
    const {data} = await $authHost.get('api/warehouse')
    return data
}

export const deleteIngredient = async (id) =>{
    const {data} = await $authHost.delete('api/warehouse/' + id)
    return data
}

export const changeIngredient = async () =>{
    const {data} = await $authHost.patch('api/warehouse')
    return data
}
