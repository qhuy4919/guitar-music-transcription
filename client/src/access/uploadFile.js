import axiosClient from './axiosClient'

const uploadFile = {
    uploadFileSong: (file) => {
        const url = `/audio/upload/`
        return axiosClient.post(url,file)
    }
}
export default uploadFile