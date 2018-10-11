/*-- 结算管理 --*/
import {_local} from '../local';

//公共

export const common = {
  QUERY_DRUG_BY_LIST: `${_local}/a/common/queryDrugByList`,   //通用名|产品名 查询药品列表
}

//结算单
export const settlementMgt = {
  SETTLE_LIST: `${_local}/a/settle/list`,       //结算单管理列表
  DETAIL_LIST: `${_local}/a/settle/detailList`, //结算单详情列表
};

//日对账单
export const dayStatements = {
  DAILY_LIST: `${_local}/a/bill/balance/dailyList`,   //日对账单列表
  DAILY_DETAIL_LIST: `${_local}/a/bill/balance/dailyDetailList`,//日对账单详情列表
  GENERATOR_DAILY_LIST: `${_local}/a/bill/balance/generatorDailyList`,//生成对账单列表
}

//发票查询
export const invoiceQueryMenu = {
  INVOICE_LIST: `${_local}/a/invoice/list`,     //发票查询列表
}

//统计分析
export const statisticAnalysis = {
  
}