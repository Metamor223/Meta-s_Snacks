import {$authHost} from "./index";

export const fetchWarehouse = async () =>{
    const {data} = await $authHost.get('api/warehouse')
    return data
}

export const changeWarehouse = async (updates) =>{
    const {data} = await $authHost.patch('api/warehouse',{updates: updates})
    console.log("ДЛЯ СОХРАНЕНИЯ",updates)
    return data
}
