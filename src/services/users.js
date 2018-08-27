import request from '../utils/request';
import { _local } from '../api/local'

export function EncryptPassword(options){
  return request(`${_local}/7/a/his/entryptPassword`,{ //密码加密
    methods: 'POST',
    type: 'formData',
    credentials: 'omit',
    body: options
  })
}
export function userLogin(options){
  return request(`${_local}/7/a/login`,{ //登陆
    methods: 'POST',
    type: 'formData',
    credentials: 'omit',
    withCredentials: true,
    body: options
  })
}



