/*
 * 系统管理 - 系统设置
 */
import * as sysSettingService from '../../services/system/sys/menu';

export default {
  namespace: 'sysSetting',
  state:{},
  reducers: {},
  effects:{
    //系统设置-菜单管理-新增
    *MenuSave({ payload, callback },{ put, call }){
      const data = yield call(sysSettingService.MenuSave, payload);
      console.log(data,'userLogin')
    },
    //系统设置-菜单管理-删除
    *MenuDelete({ payload, callback },{ put, call }){
      const data = yield call(sysSettingService.MenuDelete, payload);
      console.log(data,'userLogin')
    },
    //系统设置-菜单管理-详情
    *MenuDetail({ payload, callback },{ put, call }){
      const data = yield call(sysSettingService.MenuDetail, payload);
      console.log(data,'userLogin')
    },
  },
  subscriptions: {}
}