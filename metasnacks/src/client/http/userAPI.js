import {$authHost,$host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, organisation_name, contactName, password) => {
 const {data} = await $host.post('api/user/registration', {email,organisation_name,contactName,password})
 localStorage.setItem('token', data.token)
 return jwtDecode(data.token)
}

export const login = async (email, password) => {
 const {data} = await $host.post('api/user/login', {email, password})
 localStorage.setItem('token', data.token)
 return jwtDecode(data.token)
}

export const check = async () => {
 const {data} = await $authHost.get('api/user/auth')
 localStorage.setItem('token', data.token)
 return jwtDecode(data.token)
}

export const fetchUsers = async () => {
 try {
  const {data} = await $authHost.get('api/user/'); // Преобразуем в JSON
  return data;
 } catch (error) {
  console.error("Ошибка при загрузке пользователей:", error);
  throw error;
 }
}