/*
 * @Author: yuwei  系统管理-组织机构-部门管理
 * @Date: 2018-08-27 10:06:37 
* @Last Modified time: 2018-08-27 10:06:37 
 */
import request from '../../../utils/request';
import { _local } from '../../../api/local';


//操作部门信息（添加、修改）
export function OperSysDept(options){
  return request(`${_local}/a/sys/sysdept/operSysDept`,{ 
    method: 'POST',
    type: 'json',
    body: options
  })
}

//部门管理 - 详情
export function DepartmentDetails(options){
  return request(`${_local}/a/sys/sysdept/deptInfo`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
}