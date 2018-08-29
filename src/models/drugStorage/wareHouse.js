import * as wareHouse from '../../services/drugStorage/wareHouse';
import {message} from 'antd';

export default {
  namespace: "wareHouse",
  state: {
    detailInfo: {
      unVerifyList: [],
      verifyList: []
    },
    putawayInfo: {
      shevleDetailList: [],
      unShevleDetailList: []
    },
    supplierList: [],
    putStorageInfo: {}
  },
  effects: {
    *deliverRequest({ payload, callback },{ put, call }) {
      const data = yield call(wareHouse.detailsInfo, payload);
      if(data.code === 200) {
        yield put({
          type: "setdetailInfo",
          payload: data.data
        });
        callback && callback();
      }else {
        message.error(data.msg);
      };
    },
    *putawayRequest({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.putawayInfo, payload);
      if(data.code === 200) {
        yield put({
          type: "putawayInfo",
          payload: data.data
        });
        callback && callback();
      }else {
        message.error(data.msg);
      }
    },
    *getsupplierList({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.getsupplierList, payload);
      if(data.code === 200) {
        yield put({
          type: "setsupplierList",
          payload: data.data
        });
        callback && callback();
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
    setdetailInfo(state, action) {
      return {
        ...state,
        detailInfo: action.payload
      }
    },
    putawayInfo(state, action) {
      return {
        ...state,
        putawayInfo: action.payload
      }
    }
  },
}