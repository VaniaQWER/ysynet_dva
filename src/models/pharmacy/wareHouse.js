import * as wareHouse from '../../services/pharmacy/wareHouse';
import { message } from 'antd';

export default {
  namespace: 'pharmacy',
  state: {
    drugsForInfo: {}
  },
  reducers: {
    setDrugsForInfo(state, action) {
      return {
        ...state,
        drugsForInfo: action.payload
      }
    }
  },
  effects: {
    //药品申领详情
    *drugsForInfo({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.drugsForInfo, payload);
      if(data.code === 200 && data.msg === "success") {
        put({
          type: 'setDrugsForInfo',
          payload: data.data
        });
      }else {
        message.error(data.msg);
      }
    },
    //药品验收详情
    *checkDetail({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.checkDetail, payload);
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data)
      }else {
        message.error(data.msg);
      }
    },
    //确认验收
    *saveCheck({payload, callback}, {call}) {
      const data = yield call(wareHouse.saveCheck, payload);
      console.log(data, '验收');
      if(data.code === 200 && data.msg === 'success') {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    }
  },
  subscriptions: {
    
  }
}