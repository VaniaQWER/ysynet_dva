/*-- 盘点损益 --*/
import request from '../../utils/request';
import { _local } from '../../api/local';

/*-- 新建盘点 --*/
//新建
export function createCheckbill(options) {
  return request(`${_local}/a/checkbill/create`, {
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
//删除
export function deleteCheckBill(options) {
  return request(`${_local}/a/checkbill/delete`, {
    methods: 'POST',
    type: 'json',
    body: options
  })
}
//详情头部
export function getCheckbill(options) {
  return request(`${_local}/a/checkbill/get`, {
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
/*-- end --*/