import * as checkDecrease from '../../services/checkDecrease';

/*-- 盘点损益 --*/

export default {
  namespace: 'checkDecrease',
  state: {},
  reducers: {},
  effects: {
    /*-- 新建盘点 --*/
    //新建
    *createCheckbill({callback, payload}, {call}) {
      const data = yield call(checkDecrease.createCheckbill, payload);
      callback && callback(data);
    },
    //删除
    *deleteCheckBill({callback, payload}, {call}) {
      const data = yield call(checkDecrease.deleteCheckBill, payload);
      callback && callback(data);
    },
    //详情头部
    *getCheckbill({callback, payload}, {call}) {
      const data = yield call(checkDecrease.getCheckbill, payload);
      callback && callback(data);
    }
    /**-- end --**/
  }
}