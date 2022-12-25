import axiosClient from './axiosClient'

const auth = {
    login: (credentials) => {
        const url = 'auth/login/'
        return axiosClient.post(url, credentials)
    },
    register: (credentials) => {
        const url = 'auth/register/'
        return axiosClient.post(url, credentials)
    },
    getuser: () => {
        const url = 'auth/profile/'
        return axiosClient.get(url)
    },
    edituser: (credentials) => {
        const url = 'auth/profile/'
        return axiosClient.post(url,credentials)
    },
    changePassword: (credentials) => {
        const url = '/auth/change-password/'
        return axiosClient.post(url, credentials)
    },
}

export default auth
