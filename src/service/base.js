import api from './http';
const qs = require('qs');

export default {
  getShopList(params) {
    // 商品搜索
    return api.post('https://route.showapi.com/1615-1', params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        transformRequest: [function (data) {
          return qs.stringify(data);
        }]
      }).then((resp) => {
      if (resp.showapi_res_code !== 0) {
        return null;
      }
      return resp.showapi_res_body;
    });
  },
  getPriceList(params) {
    // 商品历史价格
    return api.post('http://route.showapi.com/1615-2', params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        transformRequest: [function (data) {
          return qs.stringify(data);
        }]
      }).then((resp) => {
      if (resp.showapi_res_code !== 0) {
        return null;
      }
      return resp.showapi_res_body;
    });
  },
};

