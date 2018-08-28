/*
 * 系统管理 - 组织机构
 */
import * as supplierMgtService from '../../services/system/organization/supplierMgt';
import * as userMgtService from '../../services/system/organization/userMgt';
import { message } from 'antd';

export default {
  namespace: 'Organization',
  state:{
    
  },
  reducers: {
  },
  effects:{
    *SupplierSave({ payload, callback },{ put, call }){
      const data = yield call(supplierMgtService.SupplierSave, payload);
      console.log(data,'userLogin');
      if (data.code === 200) {
        message.success('操作成功！');
        if (callback) callback();
      } else {
        message.error(data.msg);
      }
    },
    *SupplierDelete({ payload, callback },{ put, call }){
      const data = yield call(supplierMgtService.SupplierDelete, payload);
      console.log(data,'userLogin');
      if (data.code === 200) {
        message.success('删除成功！');
        if (callback) {
          callback();
        }
      } else {
        message.error(data.msg);
      }
    },
    /******   用户管理  *****/
    // 所属科室
    *getAllDeptByCondition({ payload, callback },{ call }){
      const data = yield call(userMgtService.getAllDeptByCondition, payload);
      if(data.code !== 200){
        message.error(data.msg ||'获取所属科室失败')
      }
      if(callback) callback();
    },
    // 所属部门
    *getAllDepts({ payload, callback },{ call }){
      const data = yield call(userMgtService.getAllDepts, payload);
      if(data.code !== 200){
        message.error(data.msg ||'获取所属部门失败')
      }
      if(callback) callback(data.data);
    },
    // 重置密码
    *ResetPwd({ payload, callback },{ put, call }){
      const data = yield call(userMgtService.resetPwd, payload);
      if(data.code !== 200){
        message.error(data.msg ||'重置密码失败')
      }
      if(callback) callback();
    },
    *getRoleInfo({ payload, callback },{ put, call }){
      const data = yield call(userMgtService.getRoleInfo, payload);
      if(data.code !== 200){
        message.error(data.msg ||'获取所有得角色信息失败')
      }
      if(callback) callback(data.data);
    },
    
  },
  subscriptions: {}
}