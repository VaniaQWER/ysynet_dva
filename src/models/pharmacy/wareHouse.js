import * as wareHouse from '../../services/pharmacy/wareHouse';
import { message } from 'antd';

export default {
  namespace: 'pharmacy',
  state: {
    
  },
  reducers: {
    
  },
  effects: {
    //药品申领详情
    *drugsForInfo({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.drugsForInfo, payload);
      if(data.code === 200 && data.msg === "success") {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    *DeleteMakeup({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.DeleteMakeup, payload);
      if(data.code === 200 && data.msg === "success") {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    *GETMakeupDetail({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.GETMakeupDetail, payload);
      if(data.code === 200 && data.msg === "success") {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
  },
  subscriptions: {
    
  }
}