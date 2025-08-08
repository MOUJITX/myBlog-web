import axios from 'axios';
import { ElNotification } from 'element-plus';
import router from '@/router';

const service = axios.create({
  baseURL: '/api', // url = base url + request url
  timeout: 10000,
});

// Request interceptors
service.interceptors.request.use(
  config => {
    // console.warn('config', config);
    // config.headers['Content-Type'] = 'application/json;charset=utf-8';
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      ElNotification({
        title: res.code === 401 ? '验证失败，请重新登录' : res.msg,
        message: res.data,
        type: 'error',
        duration: 5 * 1000,
        zIndex: 99999,
      });
      if (res.code === 401) router.push('/admin/login');
      return false;
    }
    return res;
  },
  error => {
    console.error('Service Request Error', error.response);
    ElNotification({
      title: 'Service Request Error',
      type: 'error',
      duration: 5 * 1000,
      zIndex: 99999,
    });
    return false;
  },
);

export default service;
