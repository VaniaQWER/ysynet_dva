import * as wareHouse from '../../services/drugStorage/wareHouse';
import {message} from 'antd';

export default {
  namespace: "wareHouse",
  state: {
    detailInfo: {
      unVerfiyList: [],
      verifyList: []
    },
    putawayInfo: {
      shevleDetailList: [],
      unShevleDetailList: [],
      goodsLists: []
    },
    supplierList: [],
    putStorageInfo: {}
  },
  effects: {
    *putawayRequest({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.putawayInfo, payload);
      if(data.code === 200) {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    *getsupplierList({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.getsupplierList, payload);
      if(data.code === 200) {
        callback && callback(data.data);
      }else {
        message.error(data.msg);
      }
    },
    *getPutStorageInfo({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.getPutStorageInfo, payload);
      if(data.code === 200) {
        yield put({
          type: "setPutStorageInfo",
          payload: data.data
        });
        callback && callback();
      }else {
        message.error(data.msg);
      }
    },
    *putSaveCheck({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.putSaveCheck, payload);
      if(data.code === 200) {
        callback && callback(data);
      }else {
        message.error(data.msg);
      }
    }
  },
  reducers: {
    setPutStorageInfo(state, action) {
      return {
        ...state,
        putStorageInfo: action.payload
      }
    },
    setsupplierList(state, action) {
      return {
        ...state,
        supplierList: action.payload
      }
    },
  },
}