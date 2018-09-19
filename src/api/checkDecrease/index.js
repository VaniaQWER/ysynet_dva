/*-- 盘点损益 --*/
import {_local} from '../local';

export const common = {
  CHECKBILL_LIST: `${_local}/a/checkbill/list`,   //盘点列表
  SUPPLIER_LIST: `${_local}/a/depot/supplier/all`,     //供应商下拉
}
/*-- 新建盘点 --*/
export const checkDecrease = {
  GET_LIST_BY_BILLNO: `${_local}/a/checkbilldetail/getListByBillNo`,    //详情底部
}

/*-- 损益记录 --*/
export const profiLossRecord = {
  CAUSTICEXCESSIVE_LIST: `${_local}/a/causticexcessive/list`,     //列表
  GET_LIST_BY_BILLNO: `${_local}/a/checkbilldetail/getListByBillNo`,  //详情底部
}

