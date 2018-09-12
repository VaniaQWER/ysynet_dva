import request from '../../utils/request';
import { _local } from '../../api/local';

export function getCheckDetail(options) {
  return request(`${_local}/a/basemedicinedetail/getCheckDetail`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}