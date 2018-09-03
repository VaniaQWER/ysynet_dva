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
export function getsupplierList(options) {     //供应商下拉框
  return request(`${_local}/a/depot/supplier/list`, {    
    method: 'POST',
    type: 'formData',
    body: options
  })
}

export function getPutStorageInfo(options) {    //入库单详情
  return request(`${_local}/a/depot/depotinstore/info`, {
    method: 'POST',
    type: 'formData',
    body: options
  })
};

export function saveCheck(options) {       //增加验收批号
  return request(`${_local}/a/depot/depotdistributedetail/checkList`, {
    method: 'POST',
    type: 'json',
    body: options
  })
};

export function putSaveCheck(options) {   //上架完成
  return request(`${_local}/a/depot/shelfList/finish`, {
    method: 'POST',
    type: 'json',
    body: options
  })
}

/*出库单管理*/
//出库单详情
export function outStoreDetailInfo(options) {
  return request(`${_local}/a/common/outstoredetail/outStoreDetailInfo`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}

//出库单复核通过
export function checkOutStore(options) {
  return request(`${_local}/a/common/outstoredetail/checkOutStore`, {
    method: 'POST',
    type: 'formData',
    body: options
  })
}