import axiosClient from './axiosClient'
import axios from 'axios';
export const QueryAPI = {};

export const CommandAPI = {
    song: {
        single: (data: any) => {
            // const path = '/audio/upload/';
            const url = 'https://chexanhblog.online/audio/upload/'
            let config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            };
            return axios.post(url,data,config);
        }
    }
};
