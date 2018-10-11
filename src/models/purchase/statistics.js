import * as statistics from '../../services/purchase/statistics';
/* 采购结算 -  统计 & 发票 */
export default {
  namespace: 'statistics',
  state: {},
  reducers: {},
  effects: {
    /*-- 发票查询 --*/
    //发票查询详情
    *invoiceDetail({payload, callback}, {call}) {
      const data = yield call(statistics.invoiceDetail, payload);
      callback && callback(data);
    },
    /*-- end --*/
  }
}