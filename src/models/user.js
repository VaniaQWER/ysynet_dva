import * as usersService from '../services/users';
import { message } from 'antd';

export default {
  namespace: 'users',
  state:{
    userInfo: {
      
    },
    currentMenuList: [],
    deptList: [],
    currentDept: {}
  },
  reducers: {
    userInfo(state,action){
      let { payload } = action;
      let deptList = [];
      payload.deptInfo.map(item => deptList.push({ deptId: item.deptId,deptName: item.deptName }))
      let dept = payload.deptInfo[0];
      return {
        ...state,
        userInfo: payload,
        currentDept: { deptId: dept.deptId, deptName: dept.deptName },
        deptList
      }
    },
    saveCurrentMenu(state,action){
      return {
        ...state,
        currentMenuList: action.payload.menu
      }
    }
  },
  effects:{
    // 密码加密
    *EncryptPassword({ payload, callback },{ put, call }){
      const data = yield call(usersService.EncryptPassword, payload);
      if(data.code !== 200){
        message.error(data.msg ||'密码加密失败')
      }
      if(callback) callback(data.data);
    },
    // 用户登陆
    *userLogin({ payload, callback },{ put, call }){
      const data = yield call(usersService.userLogin, payload);
      if(data.code !== 200){
        message.error(data.msg ||'登陆失败')
      }
      yield put({ type: 'userInfo',payload: data.data });
      if(callback) callback(data.data);
    },
    *setCurrentMenu({ payload },{ put }){
      yield put({ type: 'saveCurrentMenu', payload })
    }
  },
  subscriptions: {
    
  }
}