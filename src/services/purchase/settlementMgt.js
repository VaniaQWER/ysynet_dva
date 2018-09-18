/* 采购结算 - 结算管理 */
import request from '../../utils/request';
import { _local } from '../../api/local';
/*-- 结算单 --*/
export function settleDetail(options) {
  return request(`${_local}/a/settle/detail`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
};
/*-- end --*/

/*-- 日对账单 --*/
export function dailyDetail(options) {
  return request(`${_local}/a/bill/balance/dailyDetail`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}

export function push2Hrp(options) {
  return request(`${_local}/a/bill/balance/push2Hrp`, {
    method: 'POST',
    type: 'json',
    body: options
  })
}
/*-- end --*/