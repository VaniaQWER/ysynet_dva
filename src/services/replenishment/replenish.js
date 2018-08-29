/**
 * @file 补货管理 - 补货计划
 * @author chengyafang
 * @Date 2018/8/29 11:08
 */
import request from '../../utils/request';
import { _local } from '../../api/local';

// 补货计划 - 删除
export function ReplenishDelete(options) {
  return request(`${_local}/a/depot/depotplan/updateStatus`, {
    methods: 'POST',
    // type: 'formData',
    body: options
  })
}
// 补货计划 - 详情
export function ReplenishDetails(options) {
  return request(`${_local}/a/depot/depotplan/detail`, {
    method: 'GET',
    type: 'planCode',
    body: options
  })
}

export function typelist(options) {
  return request(`${_local}/a/spd/dict/typelist`, {
    methods: 'GET',
    type: 'json',
    body: options
  })
}