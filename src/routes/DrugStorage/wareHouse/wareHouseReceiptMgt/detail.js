/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-27 15:11:46
 */
/* 
  @file 入库 详情
*/
import React, { PureComponent } from 'react';

import { Table ,Row, Col,Tooltip } from 'antd';

import {connect} from 'dva';

const columns = [
  {
    title: '通用名',
    width: 180,
    dataIndex: 'ctmmGenericName'
  },
  {
    title: '商品名',
    width: 150,
    dataIndex: 'ctmmTradeName',
  },
  {
    title: '规格',
    width: 270,
    dataIndex: 'ctmmSpecification',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '剂型',
    width: 150,
    dataIndex: 'ctmmDosageFormDesc',
  },
  {
    title: '包装规格',
    width: 150,
    dataIndex: 'packageSpecification',
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 'replanUnit',
  },
  {
    title: '入库数量',
    dataIndex: 'inQuantity',
    width: 80,
  },
  {
    title: '生产批号',
    width: 180,
    dataIndex: 'productBatchNo',
  },
  {
    title: '生产日期',
    width: 200,
    dataIndex: 'realProductTime',
  },
  {
    title: '有效期至',
    width: 200,
    dataIndex: 'realValidEndDate',
  },
  {
    title: '货位',
    width: 200,
    dataIndex: 'realPositionCode',
  },
  {
    title: '批准文号',
    width: 200,
    dataIndex: 'approvalNo',
  },
  {
    title: '生产厂家',
    width: 200,
    dataIndex: 'ctmmManufacturerName',
  }
];

class ReplenishmentDetail extends PureComponent{
  componentDidMount = () => {
    this.props.dispatch({
      type: 'wareHouse/getPutStorageInfo',
      payload: {
        inStoreCode: this.props.match.params.id,
      }
    })
  }
  render(){
    let {putStorageInfo: data} = this.props;
    let {list} = data;
    return (
      <div  className="fullCol fadeIn">
        <div className='fullCol-fullChild'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                <label>部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.deptName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
              <label>入库分类</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>{data.inStoreTypeName || ''}</div>
            </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.ctmaSupplierName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>入库单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.inStoreCode || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>配送单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.distributeCode || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>订单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.orderCode || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>入库时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.updateDate || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>上架时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.createDate || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>备注</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{data.remarks || ''}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <h3 style={{margin: '0 0 20px 0', paddingBottom: 10, borderBottom: '1px solid #e8e8e8'}}>产品信息</h3>
          <Table
            bordered
            dataSource={list}
            scroll={{x: '130%'}}
            columns={columns}
            rowKey={'id'}
            pagination={false}
          />
        </div>
      </div>
    )
  }
}
export default connect(state=>state.wareHouse)(ReplenishmentDetail);
