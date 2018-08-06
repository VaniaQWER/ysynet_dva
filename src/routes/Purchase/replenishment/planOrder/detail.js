/*
 * @Author: wwb 
 * @Date: 2018-07-24 20:15:54 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-06 21:52:40
 */
/* 
  @file 补货计划 详情
*/
import React, { PureComponent } from 'react';
import { Table ,Row, Col,Tooltip } from 'antd';
import { createData } from '../../../../common/data';
const sendDataSource = [{
  id: '1',
  fOrgName: '国药药业集团',
  createUser: '下单人',
  createUTime: '2018-07-12 17:09:15',
  checkUser: '采购员',
  checkTime: '2018-07-12 17:09:15'
}]
const columns = [
  {
    title: '通用名称',
    width: 180,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '商品名称',
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
    title: '批准文号',
    width: 180,
    dataIndex: 'approvalNo',
  },
  {
    title: '生产厂家',
    width: 200,
    dataIndex: 'productCompany',
  },
  {
    title: '包装规格',
    width: 270,
    dataIndex: 'spec',
  },
  {
    title: '单位',
    width: 100,
    dataIndex: 'unit',
    render:(text)=>'g'
  },
  {
    title: '需求数量',
    dataIndex: 'amount',
    render: (text,record,index) => '10' 
  },
  {
    title: '配送数量',
    dataIndex: 'psAmount',
    render: (text,record,index) => '10 ' 
  },
  {
    title: '价格',
    width: 120,
    dataIndex: 'price',
  },
  {
    title: '金额',
    width: 120,
    dataIndex: 'total',
    render: () => '1000.00'
  },
  {
    title: '供应商',
    width: 200,
    dataIndex: 'producerName',
  }];
  const sendColumns = [{
    title: '配送单状态',
    width: 90,
    dataIndex: 'fstate',
    render: () => '交易完成'
  },{
    title: '配送单号',
    dataIndex: 'planNo',
    render: () => 'PS002211807000086U'
  },{
    title: '订单号',
    dataIndex: 'orderNo',
    render: () => 'DD002211807000086U'
  },{
    title: '收货地址',
    dataIndex: 'tfAddress',
    render: () => '这个地址地址的字段挺长的'
  },{
    title: '供应商',
    width: 150,
    dataIndex: 'fOrgName'
  },{
    title: '制单人',
    width: 120,
    dataIndex: 'createUser',
  },{
    title: '制单时间',
    width: 200,
    dataIndex: 'createUTime',
  },{
    title: '验收人',
    dataIndex: 'checkUser',
  },{
    title: '验收时间',
    width: 200,
    dataIndex: 'checkTime',
  }]

class ReplenishmentDetail extends PureComponent{
  render(){
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display: 'flex',justifyContent: 'space-between' }}>
            <h3>单据信息</h3>
          </div>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>订单号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>PA002211807000086U</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>待确认</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>补货</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>华润药业集团</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>下单人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>李德全</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>下单时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2015-09-03 15:00:02
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>收货地址</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>这是一个药房的地址</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>关闭人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>关闭时间</label>
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
            scroll={{x: '180%'}}
            columns={columns}
            rowKey={'id'}
            pagination={{
              size: 'small',
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </div>
        <div className='detailCard'>
          <Table
            dataSource={sendDataSource}
            bordered
            title={()=>'配送单信息'}
            scroll={{x: '180%'}}
            columns={sendColumns}
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
