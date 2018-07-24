import request from '../utils/request';
import { _local } from '../api/local'

export function login(options){
  return request(`${_local}/login/subSystemLogin`,{ //用户登陆
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
export function getDeployOrgName(options){
  return request(`${_local}/login/getDeployOrgName`,{ //获取机构名称
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function getUserM(options){
  return request(`${_local}/user/getUserM`,{ // 获取菜单
    methods: 'POST',
    type: 'formData',
    body: options
  })
}


export function getUserSubSystem(options){
  return request(`${_local}/login/getUserSubSystem`,{ //获取子系统
    methods: 'POST',
    type: 'formData',
    body: options
  })
}