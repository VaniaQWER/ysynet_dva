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
}