/* 药库 - 出库 */

import {_local} from '../local';
export const outStorage = {
  /* 拣货下架 */
  FINDPICKINGORDER_LIT: `${_local}/a/common/pickingorder/list`,    //拣货列表
  /* 出库单管理 */
  OUTSTORELIST: `${_local}/a/common/outstore/list`,     //出库单列表
  GETFILTERDRUGINFO: `${_local}/a/common/outstoredetail/getFilterDrugInfo`,  //新建出库添加产品列表
}