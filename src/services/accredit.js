import request from '../utils/request';

export function searchDeployList(options){
  return request('/deploy/searchDeployList',{ //部署管理列表查询
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

