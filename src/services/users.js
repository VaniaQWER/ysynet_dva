import request from '../utils/request';
import { _local } from '../api/local'

export function EncryptPassword(options){
  return request(`${_local}/a/his/entryptPassword`,{ //密码加密
    method: 'POST',
    type: 'formData',
    credentials: 'omit',
    body: options
  })
}
export function userLogin(options){
  return request(`${_local}/a/login`,{ //登陆
    method: 'POST',
    mode: 'no-cors',
    type: 'formData',
    // credentials: 'omit',
    body: options
  })
}



