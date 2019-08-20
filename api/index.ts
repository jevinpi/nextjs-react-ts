/**
 * 创建axios的实例，增加拦截器
 */
import axios from 'axios';
// import codeMessages from './codeMessages';

const instance = axios.create({
    timeout: 10000,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * request拦截器
 */
instance.interceptors.request.use(
    (config: any) => {
        config.headers.Authorization = 'Bearer';
        return config;
    },
    (error: any) => {
        console.log(error);
        Promise.reject(error);
    }
);

/**
 * response拦截器
 */
instance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
        // switch (error.response.status) {
        //     default:
        //         console.log(codeMessages[error.response.status]);
        // }
        return Promise.reject(error);
    }
);

export default instance;
