import {_local} from '../local';
//药房 - 申领入库
export const wareHouse = {
  APPLYLIST: `${_local}/a/apply/list`,    //药品申领列表
  QUERYDRUGBYDEPT: `${_local}/a/common/queryDrugByDept`,    //药品申领 - 新建申领 - 添加产品列表
  ROOMCHECK: `${_local}/a/room/roomacceptance/roomCheck`,   //申领入库 - 验收列表
  FIND_STORE_PAGE: `${_local}/a/roomstore/findStorePage`,   //申领入库 - 入库单管理
  ROOMACCEPTANCE: `${_local}/a/room/roomacceptance/list`,   //申领入库 - 上架列表
}

 // 药房 - 补登单据 
export const supplementDoc = {
  list: `${_local}/a/roommakeup/makeup/list`,  //补登单据列表
  
}