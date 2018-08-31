/*
 * @Author: yuwei  /applyAccept/details 申请受理详情
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col , Tooltip  } from 'antd';
import {connect} from 'dva';
const columns = [
  {
   title: '申领数量',
   width:150,
   dataIndex: 'applyNum',
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'replanUnit'
  },
  {
    title: '通用名称',
    width:100,
    dataIndex: 'ctmmGenericName',
  },
  {
    title: '商品名称',
    width:150,
    dataIndex: 'ctmmTradeName',
  },
  {
    title: '规格',
    width:150,
    dataIndex: 'ctmmSpecification',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '剂型',
    width:150,
    dataIndex: 'ctmmDosageFormDesc',
  },
  {
    title: '包装规格',
    width:150,
    dataIndex: 'packageSpecification'
  },
  {
    title: '批准文号',
    width:150,
    dataIndex: 'approvalNo',
  },
  {
    title: '生产厂家',
    width:150,
    dataIndex: 'ctmmManufacturerName',
  }
];
class DetailsApplyAccept extends PureComponent{
  componentDidMount() {
    let {applyCode} = this.props.match.params;
    this.props.dispatch({
      type: 'pharmacy/drugsForInfo',
      payload: { applyCode }
    })
  }
  render(){
    let {drugsForInfo} = this.props.pharmacy;
    let dataSource = drugsForInfo.list || [];
    
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>申领单</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{drugsForInfo.applyCode || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>状态</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{drugsForInfo.applyStatusName}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>申领部门</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{drugsForInfo.applyDeptName || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>发起人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{drugsForInfo.createUserName || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>发起时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{drugsForInfo.createDate || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>联系电话</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>13020082008</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>药房地址</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>这是一个药房的地址</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>受理人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{drugsForInfo.distributeUserName || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>受理时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'></div>
                </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            title={()=>'产品信息'}
            dataSource={dataSource}
            bordered
            scroll={{x: '100%'}}
            columns={columns}
            rowKey={'id'}
          />
        </div>
      </div>
    )
  }
}
export default connect(state=>state)(DetailsApplyAccept);