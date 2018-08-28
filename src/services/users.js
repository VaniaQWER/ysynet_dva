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
    type: 'formData',
    credentials: 'include',
    body: options
  })
}
export function test(options){
  return request(`http://192.168.31.186:7001/cookieTest`,{ //登陆
    method: 'POST',
    type: 'formData',
    body: options
  })
}

export function setCookie(options){
  return request(`http://192.168.31.186:7001/setCookie`,{ //登陆
    method: 'POST',
    type: 'formData',
    body: options
  })
}



