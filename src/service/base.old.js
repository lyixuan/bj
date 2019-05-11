import api from './http';

const qs = require('qs');

const CaiPuFenLei = 'http://route.showapi.com/1164-2';
const CaiPuChaXun = 'http://route.showapi.com/1164-1';

export default {
  getCaiPuFenLei(params) {
    // 菜谱分类
    return apiPost({url:CaiPuFenLei,params:params.syncParams});
  },
  getShopList(params) {
    // 商品搜索
    return apiPost({url:'https://route.showapi.com/1615-1',params});
  },
  getPriceList(params) {
    // 商品历史价格
    return apiPost({url:'http://route.showapi.com/1615-2',params});
  },
};

function apiPost({ url, params }) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
  return api.post(url, params,
    {
      headers: headers,
      transformRequest: [function (data) {
        return qs.stringify(data);
      }]
    }).then((resp) => {
    if (resp.showapi_res_code !== 0) {
      return null;
    }
    return resp.showapi_res_body;
  });
}