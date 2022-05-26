//这模块里面对axios进行二次封装

import axios from "axios";

//引入nprogress和其样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";

//创建axios实例
const requests = axios.create({
  //baseURL: 'http://localhost:5000',
  timeout: 5000,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
   /*  post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    } */
  }
})

//配置请求拦截器
requests.interceptors.request.use(config => {
  nprogress.start();
  let token=JSON.parse(localStorage.getItem("token"));
  if(token){
    config.headers.Authorization = token; //将token设置为请求头
  }
  return config;
}, error => {
  return Promise.reject(error);
})

// 添加响应拦截器
requests.interceptors.response.use(response => {
  nprogress.done();
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default requests;