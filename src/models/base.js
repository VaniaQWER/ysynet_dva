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
      if (data.code === 200 && data.msg === 'success') {
          callback && callback(data.data);
      } else {
        message.error(data.msg);
      }
    },
    *addDrug({payload, callback}, {put, call}) {
      const data = yield call(replenishment.addDrug, payload);
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    *submit({payload, callback}, {put, call}) {
      const data = yield call(replenishment.submit, payload);
      console.log(data, '保存');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    // 状态 类型 字典
    *orderStatusOrorderType({ payload,callback },{ call }){
      const data = yield call(replenishment.orderStatus, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取订单状态失败')
      }
      if(callback) callback(data.data)
    },
  },
  reducers: {

  },
  subscriptions: {
    
  }
}