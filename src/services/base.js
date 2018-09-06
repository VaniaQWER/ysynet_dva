import request from '../utils/request';
import { _local } from '../api/local';


//选择产品时-根据关键字获取下拉框
export function SearchProductSelect(options){
  return request(`${_local}/a/common/queryDrugByList`,{ 
    method: 'POST',
    type: 'formData',
    body: options
  })
}


//补货单据-新增出库/入库
export function InsertMakeup(options){
  return request(`${_local}/a/roommakeupdetail/makeupdetail/insertmakeup`,{ 
    method: 'POST',
    type: 'json',
    body: options
  })
}
