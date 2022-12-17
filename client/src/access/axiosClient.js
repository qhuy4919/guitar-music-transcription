import axios from 'axios'
import { stringify } from "qs";
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    // headers: {
    //     // 'content-type': 'application/json',
    //     // jwt: `Bearer ${localStorage['jwt']}`,
    //     Authorization: `Bearer ${localStorage['jwt']}`,
    //     // Cookie: `jwt=${localStorage['jwt']};`
    // },
    
    withCredentials: true,
    // credentials: 'include',
    paramsSerializer: {
        serialize: stringify // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
      },
})

export default axiosClient