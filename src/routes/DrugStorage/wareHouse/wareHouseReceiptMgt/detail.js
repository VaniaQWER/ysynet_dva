/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-06
 */
/* 
  @file 补货计划 详情
*/
import React, { PureComponent } from 'react';
import { Table ,Row, Col,Tooltip } from 'antd';
import { createData } from '../../../../common/data';
const columns = [
  {
    title: '通用名',
    width: 180,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '商品名',
    width: 150,
    dataIndex: 'productName',
  },
  {
    title: '规格',
    width: 270,
    dataIndex: 'spec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '剂型',
    width: 150,
    dataIndex: 'fmodal',
  },
  {
    title: '包装规格',
    width: 150,
    dataIndex: 'packSpec',
    render:(text)=>'g'
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 'unit',
    render:(text)=>'箱'
  },
  {
    title: '入库数量',
    dataIndex: 'amount',
    width: 80,
    render: (text,record,index) => '120' 
  },
  {
    title: '生产批号',
    width: 180,
    dataIndex: 'flot',
  },
  {
    title: '生产日期',
    width: 200,
    dataIndex: 'produceTime',
    render: (text,record,index) => '2018-07-10' 
  },
  {
    title: '有效期至',
    width: 200,
    dataIndex: 'UserfulDate',
    render: (text,record,index) => '2022-07-09' 
  },
  {
    title: '货位',
    width: 200,
    dataIndex: 'huowei',
    render: (text,record,index) => 'A1231' 
  },
  {
    title: '批准文号',
    width: 200,
    dataIndex: 'approvalNo',
  },
  {
    title: '生产厂家',
    width: 200,
    dataIndex: 'productCompany',
  }
];

class ReplenishmentDetail extends PureComponent{
  render(){
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>药库</div>
              </div>
            </Col>
            <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
              <label>入库分类</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>采购入库</div>
            </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>裕美供应商</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>入库单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>RK00221180700005QU</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>配送单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>PO0022118070000383
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>订单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>DD0022118070000383</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>入库人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>入库时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>上架人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>上架时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>备注</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            dataSource={createData()}
            bordered
            title={()=>'产品信息'}
            scroll={{x: '130%'}}
            columns={columns}
            rowKey={'id'}
            pagination={{
              size: 'small',
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </div>
      </div>
    )
  }
}
export default ReplenishmentDetail;
