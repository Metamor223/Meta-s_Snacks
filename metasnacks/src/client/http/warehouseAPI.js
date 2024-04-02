import {$authHost} from "./index";

export const createRecipe = async (recipe) => {
    const {data} = await $authHost.post('api/recepts' + recipe)
    return data
}

export const fetchRecipe = async () =>{
    const {data} = await $authHost.get('api/recepts')
    return data
}

export const createIngredient = async (Ingredient) =>{
    const {data} = await $authHost.post('api/warehouse' + Ingredient)
    return data
}

export const fetchIngredient = async () =>{
    const {data} = await $authHost.get('api/warehouse')
    return data
}