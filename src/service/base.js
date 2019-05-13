import api from './http';

const category = 'http://apis.juhe.cn/cook/category';
const query = 'http://apis.juhe.cn/cook/query.php';

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
    // 菜谱列表
    return api.get(query, {params}).then((resp) => {
      if (resp.resultcode !== '200') {
        return null;
      }
      return resp.result;
    });
  },
};
