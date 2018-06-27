import * as userService from '../services/users';

export default {

  namespace: "loginCheck",

  state: {},

  reducers: {
    login(state, action) {
      console.log(state,action.payload,'reducers')
      return { ...state, ...action };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(userService.login,payload);
      console.log('fetch','fetch')
      //console.log(data,'data')
      //yield put({ type: 'login',payload: {...payload, age: 18,sex: '男'} });
      
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
       
    }
  },


}