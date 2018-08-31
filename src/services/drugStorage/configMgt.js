/* 药库管理- 配置管理 */
import request from '../../utils/request';
import { _local } from '../../api/local';


//药库药品目录 - 补货单位下拉框
export function GetUnitInfo(options) {
  return request(`${_local}/a/depot/druginfo/getUnitInfo`,{ 
    method: 'GET',
    type: 'json',
    body: options
  })
};


//药库药品目录 - 添加药品
export function OperDeptDrug(options) {
  return request(`${_local}/a/depot/druginfo/operDeptDrug`,{ 
    method: 'POST',
    type: 'json',
    body: options
  })
};

//药库药品目录 - 移除药品
export function DeleteDeptDrug(options) {
  return request(`${_local}/a/depot/druginfo/deleteDeptDrug`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
};

//药库药品目录 - 药品详情
export function GetDrugInfo(options) {
  return request(`${_local}/a/depot/druginfo/getDrugInfo`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
};
//药库药品目录 - 编辑药品
export function EditOperDeptInfo(options) {
  return request(`${_local}/a/depot/druginfo/operDeptInfo`,{ 
    method: 'POST',
    type: 'formData',
    body: options
  })
};
