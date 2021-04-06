import axios from "axios";
import { message } from 'antd';

let headers = {};
axios.interceptors.request.use(
  config => {
    config.headers = headers;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if(response.config.method === 'post') {
      if(response.data.data && response.data.data.type === 'success') {
        message.success(response.data.data.message)
      } else if(response.data.data.type === 'error') {
        message.error(response.data.data.message)
      } else if(response.data.data.type === 'info') {
        message.info(response.data.data.message)
      }
    }
    return Promise.resolve(response.data);
  },
  error => {
    if (error && error.response) {
      let res = {code: null};
      res.code = error.response.status;
      return Promise.reject(res);
    }
    return Promise.reject(error);
  }
);
export default function request(method: any, url: any, data?: any) {
  method = method.toLocaleLowerCase(); //封装RESTful API的各种请求方式 以 post get delete为例
  if (method === "post") {
    // return axios({method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, data: qs.stringify(data), url})
    return axios.post(url, data); //axios的post 默认转化为json格式
  } else if (method === "get") {
    return axios.get(url, {
      params: data
    });
  } else if (method === "delete") {
    return axios.delete(url, {
      params: data
    });
  } else if(method === 'put') {
    return axios.put(url, data)
  }
}
