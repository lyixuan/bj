import api from './http';

const category = 'http://apis.juhe.cn/cook/category';

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
};
