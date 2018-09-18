/*-- 药房 - 配置管理 --*/
import * as outStorage from '../../services/pharmacy/outStorage';

export default {
  namespace: 'outStorage',
  state: {
    
  },
  reducers: {
    
  },
  effects: {
    /* 配置管理 -  */
    *billoutsotreDetail({payload, callback}, {call}) {
      const data = yield call(outStorage.billoutsotreDetail, payload);
      callback && callback(data);
    }
    /*-- end --*/
  }
}