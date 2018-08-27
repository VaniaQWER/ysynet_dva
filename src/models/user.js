import * as usersService from '../services/users';
import { message } from 'antd';

export default {
  namespace: 'users',
  state:{
    
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
    *userLogin({ payload, callback },{ put, call }){
      const data = yield call(usersService.userLogin, payload);
      console.log(data,'userLogin')
    }
    
  },
  subscriptions: {
    
  }
}