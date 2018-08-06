/*
 * @Author: yuwei  出库管理详情 /newLibrary/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col  } from 'antd';
import { createData } from '../../../../common/data';
const columns = [
  {
    title: '实到数量',
    width:100,
    dataIndex: 'shidaoshuliang',
    render:(text,record)=>`10`
  },
  {
    title: '需求数量',
    width:100,
    dataIndex: 'xuqiushuliang',
    render:(text,record)=>`10`
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'unit',
    render:(text)=>'g'
  },
  {
    title: '通用名称',
    width:100,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '商品名称',
    width:150,
    dataIndex: 'productName',
  },
  {
    title: '规格',
    width:150,
    dataIndex: 'spec',
  },
  {
    title: '剂型',
    width:150,
    dataIndex: 'fmodal',
  },
  {
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
    render:(text)=>'g'
  },
  {
    title: '批准文号',
    width:150,
    dataIndex: 'approvalNo',
  },
  {
    title: '生产厂家',
    width:150,
    dataIndex: 'productCompany',
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'medicinalCode',
  },
  {
    title: '生产日期',
    width:150,
    dataIndex: 'planTime',
  },
  {
    title: '有效期至',
    width:150,
    dataIndex: 'planTime12',
    render:(text,record)=>record.planTime
  },
  {
    title: '供应商',
    width:150,
    dataIndex: 'createUser',
  }
];

class DetailsNewLibrary extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      visible:false,
    }
  }

  render(){
    return (
      <div className='fullCol'>
          <div  className='fullCol-fullChild'>
            <h3>单据信息</h3>
            <Row>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>出库单</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>PA002211807000086U</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>申领单</label>
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
                    <div className='ant-form-item-control'>待验收</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>配货部门</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>药库</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>发起人</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>张一山</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>发起时间</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>验收人</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>李飞飞</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>验收时间</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
                  </div>
              </Col>
            </Row>
          </div>
          <div className='detailCard'>
            <Table
              title={()=>`产品信息`}
              dataSource={createData()}
              bordered
              scroll={{x: '200%'}}
              columns={columns}
              rowKey={'id'}
              style={{marginTop: 24}}
              pagination={{
                size: "small",
                showQuickJumper: true,
                showSizeChanger: true
              }}
            />
          </div>
      </div>
    )
  }
}
export default DetailsNewLibrary;