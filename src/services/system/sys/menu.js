/*
 * @Author: yuwei 系统管理 - 系统设置 - 菜单管理
 * @Date: 2018-08-27 16:07:56 
* @Last Modified time: 2018-08-27 16:07:56 
 */

import request from '../../../utils/request';
import { _local } from '../../../api/local';


//新增菜单
export function MenuSave(options){
  return request(`${_local}/a/spd/sys/menu/save`,{ 
    methods: 'POST',
    type: 'formData',
    credentials: 'omit',
    body: options
  })
}
//删除菜单
export function MenuDelete(options){
  return request(`${_local}/a/spd/sys/menu/delete`,{ 
    methods: 'POST',
    type: 'formData',
    credentials: 'omit',
    body: options
  })
}

//菜单详情
export function MenuDetail(options){
  return request(`${_local}/a/spd/sys/menu/detail`,{
    methods: 'GET',
    type: 'formData',
    body: options
  })
}