/*
 * @Author: wwb 
 * @Date: 2018-08-27 20:02:14 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-28 19:29:25
 */
import request from '../../../utils/request';
import { _local } from '../../../api/local';

export function resetPwd(options){
  return request(`${_local}/a/his/updatePassWord`,{ //用户管理重置密码
    method: 'POST',
    type: 'formData',
    body: options
  })
}

export function getAllDeptByCondition(options){
  return request(`${_local}/his/dept/getAllDeptByCondition`,{ //用户管理所属科室
    method: 'POST',
    type: 'formData',
    body: options
  })
}

export function getAllDepts(options){
  return request(`${_local}/a/sys/sysdept/getAllDepts`,{ //用户管理所属部门
    method: 'GET',
    type: 'formData',
    body: options
  })
}

export function getRoleInfo(options){
  return request(`${_local}/a/his/getRoleInfo`,{ //用户管理--获取所有得角色信息
    method: 'GET',
    type: 'formData',
    body: options
  })
}