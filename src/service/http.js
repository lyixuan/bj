import axios from 'axios';

const axiosIns = axios.create({
  timeout: 300000,
});


function errorMsgBox(statusText, msg) {
}

axiosIns.interceptors.request.use(
  (config) => {
    return config;
  },
  error => Promise.reject(error),
);

axiosIns.interceptors.response.use(
  (res) => {
    const data = res.data;
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      const status = error.response.status;
      if (status === 403) {
        // 超出缓存期，或TOKEN无效，重新登录
      } else if (status === 401) {
        const msg = '未授权访问的资源。';
      } else if (status === 404) {
        const msg = '请求文件不存在。';
      } else if (status >= 500) {
        const msg = '服务器错误。';
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMsgBox('Error', '网络连接异常');
    }
    return Promise.reject(error);
  },
);

const ajaxMethod = ['get', 'post', 'delete', 'put'];
const api = {};
ajaxMethod.forEach((method) => {
  api[method] = function fun(uri, data, config) {
    return new Promise((resolve) => {
      axiosIns[method](uri, data, config).then((response) => {
        resolve(response);
      });
    });
  };
});

export default api;

