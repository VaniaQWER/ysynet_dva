/*
 * @Author: yuwei  系统管理-组织机构-部门管理
 * @Date: 2018-08-27 10:06:37 
* @Last Modified time: 2018-08-27 10:06:37 
 */
import request from '../utils/request';
import { _local } from '../api/local';



export function OperSysDept(options){
  return request(`${_local}/sys/sysdept/operSysDept`,{ //操作部门信息（添加、修改）
    methods: 'POST',
    type: 'formData',
    body: options
  })
}