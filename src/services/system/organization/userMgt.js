/*
 * @Author: wwb 
 * @Date: 2018-08-27 20:02:14 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-28 16:11:24
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