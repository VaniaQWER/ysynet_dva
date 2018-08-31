/* 
  全局公共 model
*/
import * as replenishment from '../services/replenishment/replenish';
import { message } from 'antd';

export default {
  namespace: 'base',
  state:{
    replenishDetailsInfo: {}
  },
  effects:{
    // 采购部门
    *getModule({ payload,callback },{ call }){
      const data = yield call(replenishment.getModule, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取采购部门失败')
      }
      if(callback) callback(data.data)
    },
    // 补货计划 - 详情
    *ReplenishDetails({ payload, callback },{ put, call }){
      const data = yield call(replenishment.ReplenishDetails, payload);
      console.log(data,'详情');
      if (data.code === 200 && data.msg === 'success') {
          yield put({
            type: 'setReplenishDetailsInfo',
            payload: data.data
          })
          callback && callback(data.data);
      } else {
        message.error(data.msg);
      }
    },
  },
  reducers: {
    setReplenishDetailsInfo(state, action){
      return {
        ...state,
        replenishDetailsInfo: action.plyload
      }
    }
  },
  subscriptions: {
    
  }
}