/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-06 16:34:43
 */
/* 
  @file 货位调整 详情
*/
import React, { PureComponent } from 'react';
import { Table ,Row, Col,Tooltip } from 'antd';
import { createData } from '../../../../common/data';
import { connect } from 'dva';
import RemoteTable from '../../../../components/TableGrid';
import { supplementDoc } from '../../../../api/pharmacy/wareHouse';

const columns = [
  {
    title: '数量',
    width: 100,
    dataIndex: 'num',
    render:(text,record)=>"24"
  },
  {
    title: '单位',
    width: 100,
    dataIndex: 'unit1',
    render:(text)=>'箱'
  },
  {
    title: '包装规格',
    width: 270,
    dataIndex: 'spec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '目的货位类型',
    width: 120,
    dataIndex: 'unit2',
    render:(text)=>'补货货位'
  },
  {
    title: '通用名',
    width: 180,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '规格',
    width: 270,
    dataIndex: 'fmodal',
  },
  {
    title: '生产厂家',
    width: 200,
    dataIndex: 'productCompany',
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
  }
];

class ReplenishmentDetail extends PureComponent{

  state ={
    query:{},
    baseInfo:{}
  }
  componentDidMount(){
    console.log(this.props.match.params.id)
    this.props.dispatch({
      type:'pharmacy/GETMakeupDetail',
      payload:{makeupCode:this.props.match.params.id},
      callback:(data)=>{
        console.log(data)
        this.setState({
          baseInfo:data.data
        })
      }
    })
    
  }

  render(){
    const { query , baseInfo} = this.state;
    return ( 
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>补登单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>PA002211807000086U</div>
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
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>补登入库</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>待审核</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>补登人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>李四四
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>补登时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>审核人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>李四四</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>审核时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            title={()=>'产品信息'}
            style={{marginTop: 20}}
            columns={columns}
            scroll={{ x: '100%' }}
            rowKey='id'
            dataSource={[]}
          />
        </div>
      </div>
    )
  }
}
export default connect(state=>state)(ReplenishmentDetail);
