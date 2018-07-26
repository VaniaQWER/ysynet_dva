import request from '../../utils/request';
import { _local } from '../../api/local'

export function findSubSystemSelector(options){
  return request(`${_local}/subSystem/findSubSystemListForSelector`,{ //子系统下拉列表
    type: 'formData',
    body: options
  })
}

export function findSubSystemConfigList(options){
  return request(`${_local}/Configure/findSubSystemConfigList`,{ //查询子系统下的配置列表
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export async function saveSubSystemConfig(options){
  return request(`${_local}/Configure/saveSubSystemConfig`,{ //保存子系统配置
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function deleteSubSystemConfig(options){
  return request('/Configure/deleteSubSystemConfig',{ //删除子系统配置
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
