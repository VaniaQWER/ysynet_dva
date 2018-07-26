import request from '../../utils/request';
import { _local } from '../../api/local'


export function searchStaticByOrgId(options){
  return request(`${_local}/staticData/searchStaticByOrgId`,{ //查询本机构的数据字典类型
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function updateStaticData(options){
  return request(`${_local}/staticData/updateStaticData`,{ //数据字典内容编辑
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function insertData(options){
  return request(`${_local}/staticData/insertStaticData`,{ //数据字典内容 新增
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

/* 
  分类管理
*/
export function orgStaticInfo(options){
  return request(`${_local}/staticData/orgStaticInfo`,{ //查询机构字典下拉框
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function insertStaticInfo(options){
  return request(`${_local}/staticData/insertStaticInfo`,{ //新增数据字典类型
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function updateStaticInfo(options){
  return request(`${_local}/staticData/updateStaticInfo`,{ //编辑数据字典类型
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

export function copyStaticInfo(options){
  return request(`${_local}/staticData/copyStaticInfo`,{ //克隆数据字典
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
