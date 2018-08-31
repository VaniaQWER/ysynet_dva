/* 药房- 申领入库 */
import request from '../../utils/request';
import { _local } from '../../api/local';

export function drugsForInfo(options) {
  return request(`${_local}/a/apply/detail`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
};