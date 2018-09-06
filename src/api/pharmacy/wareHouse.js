import {_local} from '../local';
//药房 - 申领入库
export const wareHouse = {
  APPLYLIST: `${_local}/a/apply/list`,    //药品申领列表
  QUERYDRUGBYDEPT: `${_local}/a/common/queryDrugByDept`,    //药品申领 - 新建申领 - 添加产品列表
  ROOMCHECK: `${_local}/a/room/roomacceptance/roomCheck`,   //
}

 // 药房 - 补登单据 
export const supplementDoc = {
  list: `${_local}/a/roommakeup/makeup/list`,  //补登单据列表
  addProductList:`${_local}/a/roomlocadjust/roomDrugList`,//补登单据新增产品列表
}