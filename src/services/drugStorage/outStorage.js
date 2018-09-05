/*
 * @Author: wwb 
 * @Date: 2018-08-31 21:28:10 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-09-05 15:52:46
 */

import request from '../../utils/request';
import { _local } from '../../api/local';

/*  出库   */

// 受理配货

export function genDeptList(options) { // 已申领部门
  return request(`${_local}/a/commondistribute/applyDeptList`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
};

// 受理配货 详情
export function distributeDetail(options) { // 配货单据详情
  return request(`${_local}/a/commondistribute/distributeDetail`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
};

// 受理配货 单条配货详情
export function getSingleDetail(options) { // 配货单据详情
  return request(`${_local}/a/commondistribute/singleQuery`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
};

// 受理配货 配货信息变更
export function singUpdate(options) { //
  return request(`${_local}/a/commondistribute/singleUpdate`,{ 
    method: 'POST',
    type: 'json',
    body: options
  })
};


// 受理配货 配货状体变更事件
export function distributeEvent(options) { // 配货单据详情
  return request(`${_local}/a/commondistribute/distributeEvent`,{ 
    method: 'POST',
    type: 'formData',
    body: options
  })
};

/* 拣货 */

export function findApplyDepts(options) { // 拣货申请部门
  return request(`${_local}/a/sys/sysdept/findAllDepts`,{ 
    method: 'GET',
    type: 'formData',
    body: options
  })
};

// 
export function getPickingDetail(options) { // 拣货详情
  return request(`${_local}/a/common/pickingorderdetail/getPickingDetail`,{ 
    method: 'GET',
    type: 'json',
    body: options
  })
};

export function finishPicking(options) { // 确认拣货
  return request(`${_local}/a/common/pickingorder/finishPicking`,{ 
    method: 'POST',
    type: 'json',
    body: options
  })
};


/*出库单管理*/
//出库单详情
export function outStoreDetailInfo(options) {
  return request(`${_local}/a/common/outstoredetail/outStoreDetailInfo`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}

//出库单删除 
export function deleteOutStore(options) {
  return request(`${_local}/a//common/outstore/deleteOutStore`, {
    method: 'POST',
    type: 'json',
    body: options
  })
}

//出库单复核通过
export function checkOutStore(options) {
  return request(`${_local}/a/common/outstoredetail/checkOutStore`, {
    method: 'POST',
    type: 'json',
    body: options
  })
};

//出库单申领下拉框
export function findAllDepts(options) {
  return request(`${_local}/a/sys/sysdept/findAllDepts`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}

//出库单新建出库单保存
export function confirmOutStore(options) {
  return request(`${_local}/a/common/outstore/confirmOutStore`,{
    method: 'POST',
    type: 'json',
    body: options
  })
}
 //  出库 -- 退货
 // 供应商
 export function genSupplierList(options) {
  return request(`${_local}/a/depot/supplier/all`,{
    method: 'POST',
    type: 'formData',
    body: options
  })
}

// 退货详情
export function genBackDetail(options) {
  return request(`${_local}/a/commonback/back/info`,{
    method: 'POST',
    type: 'formData',
    body: options
  })
}

// 退货 确认操作
export function backStorage(options) {
  return request(`${_local}/a/commonback/backdetail/backSubmit`,{
    method: 'POST',
    type: 'json',
    body: options
  })
}