/*
 * @Author: wwb 
 * @Date: 2018-08-31 23:18:25 
 * @Last Modified by:   wwb 
 * @Last Modified time: 2018-08-31 23:18:25 
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
    // 配货单配货一系列操作
    *distributeEvent({ payload,callback },{ call }){
      const data = yield call(outStorageService.distributeEvent, payload);
      if(data.code !== 200){
        return message.error(data.msg||'配货单配货操作失败')
      }
      if(callback) callback(data.data)
    },

    subscriptions: {
      
    }
  }
}