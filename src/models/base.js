/* 
  全局公共 model
*/
import * as replenishment from '../services/replenishment/replenish';
import * as pharmacy from '../services/pharmacy/wareHouse';
import * as wareHouse from '../services/pharmacy/wareHouse';
import * as outStorageService from '../services/drugStorage/outStorage';
import { message } from 'antd';

export default {
  namespace: 'base',
  state:{
    replenishDetailsInfo: {}
  },
  effects:{
    //药品验收详情
    *checkDetail({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.checkDetail, payload);
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data)
      }else {
        message.error(data.msg);
      }
    },
    //药品确认验收
    *saveCheck({payload, callback}, {call}) {
      const data = yield call(wareHouse.saveCheck, payload);
      console.log(data, '验收');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    // 采购部门
    *getModule({ payload,callback },{ call }){
      const data = yield call(replenishment.getModule, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取采购部门失败')
      }
      if(callback) callback(data.data)
    },
    //药品申领 - 查询补货部门
    *selectApplyDept({payload, callback}, {call}) {
      const data = yield call(pharmacy.selectApplyDept, payload);
      if(data.code !== 200){
        message.error(data.msg);
        return;
      }; 
      callback && callback(data.data);
    },
    //药品申领 - 保存提交
    *applySubmit({payload, callback}, {call}) {
      const data = yield call(pharmacy.applySubmit, payload);
      if(data.code !== 200) {
        message.error(data.msg);
        return;
      };
      callback && callback();
    },
    //药品申领 - 新建申领 - 添加产品
    *applyAddDrug({payload, callback}, {call}) {
      const data = yield call(pharmacy.applyAddDrug, payload);
      console.log(data, '添加产品');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
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
    //补货计划 - 新建(编辑) - 添加产品
    *addDrug({payload, callback}, {put, call}) { 
      const data = yield call(replenishment.addDrug, payload);
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    //补货计划 - 新建(编辑) - 提交(保存)
    *submit({payload, callback}, {put, call}) {
      const data = yield call(replenishment.submit, payload);
      console.log(data, '保存');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    //出库单管理申领部门
    *findAllDepts({callback}, {call}) {
      const data = yield call(outStorageService.findAllDepts);
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    //药品申领出库 - 新建出库保存
    *confirmOutStore({payload, callback}, {call}) {
      const data = yield call(outStorageService.confirmOutStore, payload);
      console.log(data, '保存');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data);
      }else {
        message.error(data.msg);
      }
    },

    // 退货 详情
    *getBackStorageDetail({ payload,callback },{ call }){
      const data = yield call(outStorageService.genBackDetail, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取退货单详情失败')
      }
      if(callback) callback(data.data)
    },

    // 确认退货
    *submitBackStorage({ payload,callback },{ call }){
      const data = yield call(outStorageService.backStorage, payload);
      if(data.code !== 200){
        return message.error(data.msg||'退货操作失败')
      }
      if(callback) callback(data.data)
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