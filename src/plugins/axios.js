import Vue from 'vue';
import store from './../store';
import axios from 'axios';
import qs from 'qs'; // 引入qs模块，用来序列化post类型的数据

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.development;
axios.defaults.baseURL = process.env.production;
axios.defaults.headers.common['Authorization'] = store.state.token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

// 封装 get
get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
};

// 封装 post
post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
};

Plugin.install = function(Vue, options) {
    // Vue.axios = _axios;
    // window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        $axios: {
            get() {
                return get;
            },
            post() {
                return post;
            }
        }
    });
};

Vue.use(Plugin);

export default Plugin;
