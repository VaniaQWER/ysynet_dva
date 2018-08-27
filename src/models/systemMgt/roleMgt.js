/*
 * 角色管理
 */
import * as roleMgtService from '../../services/system/role/roleMgt';
import { message } from 'antd';

export default {
  namespace: 'systemRole',
  state:{
    
  },
  reducers: {
  },
  effects:{
    *RoleSave({ payload, callback },{ put, call }){
      const data = yield call(roleMgtService.RoleSave, payload);
      if(data.code !== 200){
        message.error(data.msg ||'密码加密失败')
      }
      if(callback) callback(data.data);
    },
    *RoleDelete({ payload, callback },{ put, call }){
      const data = yield call(roleMgtService.RoleDelete, payload);
      console.log(data,'userLogin')
    }
    
  },
  subscriptions: {}
}