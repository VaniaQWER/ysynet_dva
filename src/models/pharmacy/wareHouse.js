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
    *drugsForInfo({payload, callback}, {put, call}) {
      const data = yield call(wareHouse.drugsForInfo, payload);
      console.log(data, '详情');
      if(data.code === 200 && data.msg === "success") {
        put({
          type: 'setDrugsForInfo',
          payload: data.data
        });
      }else {
        message.error(data.msg);
      }
    }
  },
  subscriptions: {
    
  }
}