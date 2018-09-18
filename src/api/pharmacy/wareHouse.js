import {_local} from '../local';
//药房 - 申领入库
export const wareHouse = {
  APPLYLIST: `${_local}/a/apply/list`,    //药品申领列表
  QUERYDRUGBYDEPT: `${_local}/a/common/queryDrugByDept`,    //药品申领 - 新建申领 - 添加产品列表
  CHECKACCEPT_LIST: `${_local}/a/checkaccept/list`,   //申领入库 - 验收列表
  FIND_STORE_PAGE: `${_local}/a/roomstore/findStorePage`,   //申领入库 - 入库单管理
  ROOMACCEPTANCE: `${_local}/a/checkaccept/shelfList`,   //申领入库 - 上架列表
  QUERY_DRUG_BY_LIST: `${_local}/a/common/queryDrugByList`,  //申领入库 - 新建申领-添加产品
}

 // 药房 - 补登单据 
export const supplementDoc = {
  list: `${_local}/a/roommakeup/makeup/list`,  //补登单据列表
  addProductList:`${_local}/a/roomlocadjust/roomDrugList`,//补登单据新增产品列表
  addlist: `${_local}/a/roommakeupdetail/makeupdetail/addlist`, //补登入库单添加产品
}