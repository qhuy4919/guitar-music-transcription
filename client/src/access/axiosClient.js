import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: "http://52.221.245.51/",
    // headers: {
    //     'content-type': 'application/json',
    // },
    paramsSerializer: (params) => queryString.stringify(params),
})

export default axiosClient
