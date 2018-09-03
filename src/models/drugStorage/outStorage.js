/*
 * @Author: wwb 
 * @Date: 2018-08-31 23:18:25 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-09-03 15:39:10
 */

import * as outStorageService from '../../services/drugStorage/outStorage';
import { message } from 'antd';

export default {
  namespace: 'outStorage',
  state: {

  },
  reducers: {

  },
  effects: {
    /*出库单管理*/
    *checkOutStore({payload, callback}, {call}) {
      const data = yield call(outStorageService.checkOutStore, payload);
      console.log(data, '复核');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data)
      }else {
        message.error(data.msg);
      }
    },
    //出库单管理详情
    *outStoreDetailInfo({payload, callback}, {call}) {
      const data = yield call(outStorageService.outStoreDetailInfo, payload);
      if(data.code === 200 || data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    // 已申领部门
    *genDeptList({ payload,callback },{ call }){
      const data = yield call(outStorageService.genDeptList, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取申领部门失败')
      }
      if(callback) callback(data.data)
    },

    // 配货单据详情
    *distributeDetail({ payload,callback },{ call }){
      const data = yield call(outStorageService.distributeDetail, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取配货单详情失败')
      }
      if(callback) callback(data.data)
    },

    // 查询配货明细的单条配货记录
    *getDistributeDetail({ payload,callback },{ call }){
      const data = yield call(outStorageService.getSingleDetail, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取明细配货记录失败')
      }
      if(callback) callback(data.data)
    },


    // 配货单配货一系列操作
    *distributeEvent({ payload,callback },{ call }){
      const data = yield call(outStorageService.distributeEvent, payload);
      if(data.code !== 200){
        return message.error(data.msg||'配货单配货操作失败')
      }
      if(callback) callback(data.data)
    },

    /*  出库确认拣货  */
    *finishPicking({ payload,callback },{ call }){
      const data = yield call(outStorageService.finishPicking, payload);
      if(data.code !== 200){
        return message.error(data.msg||'拣货失败')
      }
      if(callback) callback(data.data)
    },
    subscriptions: {
      
    }
  }
}