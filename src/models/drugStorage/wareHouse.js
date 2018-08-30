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
          payload: data.data.list
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
    },
    *saveCheck({ payload, callback }, {put, call}) {
      
      const data = yield call(wareHouse.saveCheck, payload);
      if(data.code === 200) {
        callback && callback(data);
      }
    },
    *putSaveCheck({ payload, callback }, {put, call}) {
      const data = yield call(wareHouse.putSaveCheck, payload);
      if(data.code === 200) {
        callback && callback(data);
      }
    }
  },
  reducers: {
    addBatch(state, action) {
      let {detailInfo} = state;
      let {record} = action.payload;
      let index;
      detailInfo.unVerfiyList.map((item, i)=> {
        if(item.upUserDate === record.upUserDate) {
          index = i + 1;
        };
        return item;
      })
      record = JSON.parse(JSON.stringify(record));
      if(record.id === null) {
        record.parentId = record.parentId;
      }else {
        record.parentId = record.id;
      }
      record.id = null;
      record.upUserDate = new Date().getTime();
      record.realReceiveQuantity = '';
      
      detailInfo.unVerfiyList.splice(index, 0, record);
      return {
        ...state,
        detailInfo
      }
    },
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