import {$authHost,$host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, organisation_name, itn, password) => {
 const {data} = await $host.post('api/user/registration', {email,organisation_name,itn,password})
 return jwtDecode(data.token)
}

export const login = async (email, password) => {
 const {data} = await $host.post('api/user/login', {email, password})
 return jwtDecode(data.token)
}

export const check = async () => {
 const response = await $host.post('api/auth/registration',)
 return response
}