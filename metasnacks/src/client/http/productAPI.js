import {$authHost,$host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (product_id) =>{
    const {data} = await $authHost.delete('api/type/' + product_id)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const changeProduct = async (product)=>{
    const {data} = await $authHost.patch('api/product', product)
    return data
}

export const fetchProducts = async (typeofproductId, limit = 5, page) => {
    const {data} = await $host.get('api/product',{params: {
            typeofproductId, limit, page}})
    return data
}

export const fetchOneProduct = async (product_id) => {
    const {data} = await $host.get('api/product/' + product_id)
    return data
}

export const deleteProduct = async (id) =>{
    const {data} = await $authHost.delete('api/product/' + id)
    return data
}

export const createRecipe = async (recipe) => {
    const {data} = await $authHost.post('api/recepts', recipe)
    return data
}

export const fetchRecipe = async () =>{
    const {data} = await $authHost.get('api/recepts')
    return data
}

export const createFile = async () =>{
    const {data} = await $authHost.get('api/file')
    return data
}

