import api from './http';

const category = 'http://apis.juhe.cn/cook/category';
const query = 'http://apis.juhe.cn/cook/query.php';
const indexQuery = 'http://apis.juhe.cn/cook/index';

export default {
  getCaiPuFenLei(params) {
    // 菜谱分类
    return api.get(category, {params:params.syncParams}).then((resp) => {
      if (resp.resultcode !== '200') {
        return null;
      }
      return resp.result;
    });
  },
  getCaiPuList(params) {
    // 菜谱关键词搜索列表
    params.rn = '10'
    return api.get(query, {params}).then((resp) => {
      if (resp.resultcode !== '200') {
        return null;
      }
      return resp.result;
    });
  },
  getCaiPuCataList(params) {
    // 菜谱分类搜索列表
    params.rn = '10'
    return api.get(indexQuery, {params}).then((resp) => {
      if (resp.resultcode !== '200') {
        return null;
      }
      return resp.result;
    });
  },
};
