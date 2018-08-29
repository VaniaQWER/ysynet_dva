/*
 * @Author: xuhao 药库 - 入库
 */

import request from '../../utils/request';
import { _local } from '../../api/local';

/* 配送单验收 */

export function detailsInfo(options) {
  return request(`${_local}/a/DepotDistribute/depotdistribute/detail`,{ //配送单详情
    method: 'GET',
    type: 'formData',
    body: options
  })
};
/* 上架 */
export function putawayInfo(options) {
  return request(`${_local}/a/depot/shelfList/selectDistributeDetail`,{ //上架列表详情
    method: 'GET',
    type: 'formData',
    body: options
  })
};
/* 入库管理 */
export function getsupplierList() {     //供应商下拉框
  return request(`${_local}/a/depot/supplier/supplierList`, {
    method: 'GET',
    type: 'formData',
  })
}

export function getPutStorageInfo(options) {    //入库单详情
  return request(`${_local}/depot/depotinstore/info`, {
    method: 'POST',
    type: 'formData',
    body: options
  })
}