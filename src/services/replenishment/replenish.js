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