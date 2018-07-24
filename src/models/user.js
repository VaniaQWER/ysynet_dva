import * as usersService from '../services/users';
import { message } from 'antd';

export default {
  namespace: 'users',
  state:{
    menuList: [],
    userInfo: {},
    subSystemList: [],
    orgName: ''
  },
  reducers: {
    userMenu(state,action){
      return {
        ...state,
        menuList: action.payload
      }
    },
    userInfo(state,action){
      return {
        ...state,
        userInfo: action.payload
      }
    },
    subSystem(state,action){
      return {
        ...state,
        subSystemList: action.payload
      }
    },
    orgName(state,action){
      return {
        ...state,
        orgName: action.payload
      }
    }
  },
  effects:{
    *fetch({ payload },{ call, put, select }){
      // 判断state 中是否存有 menu 
      const menu = yield select(state=> state.users);
      if(menu.menuList.length === 0){
        const data = yield call(usersService.getUserM);
        if(data.status){
          yield put({ type: 'userMenu', payload: data.result });
        }else{
          message.error(data.msg|| '获取菜单失败')
        }
      }
    },
    *getOrgName({ payload },{ call, put }){
      const data = yield call(usersService.getDeployOrgName);
      if(data.status){
        yield put({ type: 'orgName',payload: data.result });
      }else{
        message.error(data.msg||'获取机构名称失败')
      }
    },
    *userLogin({ payload, callback }, { call, put }) {  // eslint-disable-line
      const data = yield call(usersService.login,payload);
      if(data.status){
        if (!data.result.userInfo) {
          message.error(data.result.loginResult)
        }else{
          if(!data.result.subSystemFlag){
            yield put({ type: 'getSubSystem' })
          }
          if(callback) callback();
          yield put({ type: 'userInfo',payload: data.result })
        }
      }
    },
    *getSubSystem({ payload, callback },{ put,call }){
      const data = yield call(usersService.getUserSubSystem, payload );
      if(data.status){
        if (callback) callback();
        yield put({ type: 'subSystem',payload: data.result })
      }
    }
    
  },
  subscriptions: {
    
  }
}