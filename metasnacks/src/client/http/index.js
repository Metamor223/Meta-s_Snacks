import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_META_SNACKS
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_META_SNACKS
})
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}