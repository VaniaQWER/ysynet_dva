/* 采购结算 - 结算管理 */
import request from '../../utils/request';
import { _local } from '../../api/local';
/*-- 发票查询 --*/
export function invoiceDetail(options) {
  return request(`${_local}/a/invoice/detail`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
};
/*-- end --*/