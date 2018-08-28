/*
 * 系统管理 - 组织机构
 */
import * as supplierMgtService from '../../services/system/organization/supplierMgt';
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
    //用户管理 重置密码
    *ResetPwd({ payload, callback },{ put, call }){
      /* const data = yield call(userMgtService.resetPwd, payload);
      if(data.code !== 200){
        message.error(data.msg ||'重置密码失败')
      }
      if(callback) callback(); */
    },
    
  },
  subscriptions: {}
}