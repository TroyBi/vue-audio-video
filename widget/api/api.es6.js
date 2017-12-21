/**
 * @file api方法声明。
 * @type Get, Post
 * @url 请求的url
 */

import axios from 'vue-audio-video:widget/lib/axios/axios.js';

const apiUrl = {
    // 提交配置的数据
    submitBasicConf: {
        type: 'POST',
        url: '/submit/basicconf'
    }
}

let apis = {};
// let CancelToken = axios.CancelToken;
apis.isCancel = axios.isCancel; // 判断是否是取消
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
// HTTP相关
Object.keys(apiUrl).forEach((item) => {
    /**
     * 创建api请求function，返回promise对象
     */
    apis[item] = function apiFunc(data) {
        let obj = apiUrl[item];
        let promise;
        let dataTmp = data;
        promise = axios({
            method: obj.type,
            url: obj.url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: [function (data) {
                // 解析参数
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                return ret;
            }],
            data: obj.type === 'get' ? {} : dataTmp,
            params: obj.type === 'get' ? dataTmp : {}
        }).then(response => {
            let data = response.data;
            return data;
        });
        return promise;
    }
});

// apis中包含基本的请求接口和取消接口，如 apis.test 和 apis.textCancel，
// 同时还包含apis.isCancel判断是否是用户主动取消的请求
export default apis;