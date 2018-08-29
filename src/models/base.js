/* 
  全局公共 model
*/
import * as replenishment from '../services/replenishment/replenish';
import { message } from 'antd';

export default {
  namespace: 'base',
  state:{
    
  },
  reducers: {
    
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

  },
  subscriptions: {
    
  }
}