/*
 * @Author: wwb 
 * @Date: 2018-08-31 21:28:10 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-09-03 14:27:54
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


// 受理配货 配货状体变更事件
export function distributeEvent(options) { // 配货单据详情
  return request(`${_local}/a/commondistribute/distributeEvent`,{ 
    method: 'POST',
    type: 'formData',
    body: options
  })
};

/* 拣货 */

// 
export function finishPicking(options) { // 确认拣货
  return request(`${_local}/a/common/pickingorder/finishPicking`,{ 
    method: 'POST',
    type: 'json',
    body: options
  })
};