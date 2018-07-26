import request from '../../utils/request';
import { _local } from '../../api/local'

/* 
   配置管理 
*/

// 保存配置
export function saveDeptConfig(options){
  return request(`${_local}/Configure/saveDeptConfig`,{ //保存配置
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
/* 
  用户管理
*/
// 重置密码
export function resetOrgUserPwd(options){
  return request(`${_local}/hscmSubSystemController/resetOrgUserPwd`,{ //用户管理重置密码
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
//新增用户  编辑用户
export function addOrUpdateOrgUser(options){
  return request(`${_local}/hscmSubSystemController/addOrUpdateOrgUser`,{ //添加/编辑机构普通用户账号
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
// 获取权限菜单
export function getOrgUserMenus(options){
  return request(`${_local}/hscmSubSystemController/getOrgUserMenus`,{ //获取权限菜单
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
// 编辑用户权限菜单
export function updateUserMenus(options){
  return request(`${_local}/hscmSubSystemController/updateUserMenus`,{ 
    methods: 'POST',
    type: 'formData',
    body: options
  })
}



/* 
   非 临床科室子系统配置管理 保存
*/
export function saveStorageConfig(options){
  return request(`${_local}/Configure/saveStorageConfig`,{ //保存配置
    methods: 'POST',
    type: 'formData',
    body: options
  })
}