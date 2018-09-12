/* 
  全局公共 model
*/
import * as base from '../services/base';
import * as replenishment from '../services/replenishment/replenish';
import * as pharmacy from '../services/pharmacy/wareHouse';
import * as wareHouse from '../services/drugStorage/wareHouse';
import * as outStorageService from '../services/drugStorage/outStorage';
import * as goodsAdjust from '../services/drugStorage/goodsAdjust';
import { message } from 'antd';

export default {
  namespace: 'base',
  state:{
    replenishDetailsInfo: {}
  },
  effects:{
    //货位移动 - 添加产品弹窗确认
    *drugInformation({payload, callback}, {call}) {
      const data = yield call(goodsAdjust.drugInformation, payload);
      console.log(data, '确认');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    *confirmAdjust({payload, callback}, {call}) {
      const data = yield call(goodsAdjust.confirmAdjust, payload);
      console.log(data, '提交');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback()
      }else {
        message.error(data.msg);
      }
    },
    //药库 - 入库 - 配送单详情
    *deliverRequest({ payload, callback },{ put, call }) {
      const data = yield call(wareHouse.detailsInfo, payload);
      if(data.code === 200) {
        callback && callback(data.data);
      };
      if(data.code === 500) {
        message.warning('未能找到该单号');
      }
    },
    //药库 - 入库 - 配送单详情 - 确认验收
    *drugStorageSaveCheck({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.saveCheck, payload);
      if(data.code === 200) {
        callback && callback(data);
      }
    },
    //药品验收详情
    *checkDetail({payload, callback}, {put, call}) {
      const data = yield call(pharmacy.checkDetail, payload);
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data)
      }else {
        message.error(data.msg);
      }
    },
    //药品确认验收
    *saveCheck({payload, callback}, {call}) {
      const data = yield call(pharmacy.saveCheck, payload);
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
    // 确认召回 或确认锁定
    *createRecallOrLocked({ payload,callback },{ call }){
      const data = yield call(outStorageService.createRecallOrLocked, payload);
      if(data.code !== 200){
        return message.error(data.msg||'操作失败')
      }
      if(callback) callback(data.data)
    },

    //补登单据 - 新建出库单
    *InsertMakeup({ payload,callback },{ call }){
      const data = yield call(base.InsertMakeup, payload);
      if(data.code !== 200){
        return message.error(data.msg)
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
    //公用---产品搜索下拉框
    *SearchProductSelect({ payload,callback },{ call }){
      const data = yield call(base.SearchProductSelect, payload);
      if(data.code !== 200){
        return message.error(data.msg)
      }
      if(callback) callback(data.data)
    }
  },
  reducers: {

  },
  subscriptions: {
    
  }
}