/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 00:23:44
 */
/* 
  @file  药库 - 入库--配送单验收-详情
*/
import React, { PureComponent } from 'react';
import {Row, Col, Tooltip, Input, InputNumber, DatePicker, Button, Tabs, Table, message} from 'antd';
import {connect} from 'dva';
import moment from 'moment';
import querystring from 'querystring';

const TabPane = Tabs.TabPane;

class PslistCheck extends PureComponent{
  constructor(props) {
    super(props);
    let info = querystring.parse(this.props.match.params.id);
    this.state = {
      selected: [],
      selectedRows: [],
      loading: true,
      btnShow: info.state === '3'? true : false,
      defaultActiveKey: info.state,
      id: info.id,
    }
  }
  tabsChange = (key) =>{
    if(key === '2') {
      this.setState({btnShow: false});
    };
    if(key === '1') {
      this.setState({btnShow: true});
    };
  }
  rowChange = (selectedRowKeys, selectedRows) => {
    this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
  }
  componentDidMount = () => {
    this.queryDetail();
  }
  saveCheck = () => {
    let {selectedRows} = this.state;
    if(selectedRows.length === 0) {
      message.error('至少选择一条数据');
      return;
    };
    let isNull = selectedRows.every(item => {
      if(!item.realReceiveQuantity){
        message.error('实到数量不能为空');
        return false;
      };
      if(!item.realProductTime){
        message.error('生产日期不能为空');
        return false;
      };
      if(!item.realValidEndDate){
        message.error('有效期至不能为空');
        return false;
      };
      if(!item.productBatchNo){
        message.error('生产批号不能为空');
        return false;
      };
      if(!item.realAcceptanceTemperature){
        message.error('验收温度不能为空');
        return false;
      };
      return true;
    });
    if(!isNull) return;
    let detailList = selectedRows;
    this.props.dispatch({
      type: 'wareHouse/saveCheck',
      payload: {
        detailList,
        distributeCode: this.state.id
      },
      callback: (data) => {
        if(data.code === 200) {
          message.succese('确认上架成功');
          this.queryDetail();
        }
      }
    })
  }
  queryDetail = () => {
    this.setState({loading: true});
    this.props.dispatch({ 
      type: 'wareHouse/deliverRequest',
      payload: {
        distributeCode: this.state.id
      },
      callback: () => {
        this.setState({loading: false});
      }
    })
  }
  render(){
    let {detailInfo} = this.props;
    let {unVerfiyList, verifyList} = detailInfo;
    let {loading, defaultActiveKey, btnShow} = this.state;
    
    const columnsUnVerfiy = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '商品名',
        dataIndex: 'ctmmTradeName'
      },
      {
        title: '规格',
        dataIndex: 'ctmmSpecification',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产厂家',
        dataIndex: 'ctmmManuFacturerName'
      },
      {
        title: '单位',
        dataIndex: 'limitDrugUnit',
      },
      {
        title: '配送数量',
        dataIndex: 'realDeliveryQuantiry'
      },
      {
        title: '实到数量',
        dataIndex: 'realReceiveQuantity',
        render: (text,record,index)=>{
          return <InputNumber 
                    onChange={(value)=>{
                      if(value > record.realDeliveryQuantiry){
                        message.warning('请注意：实到数量比配送数量多');
                      }
                      record.realReceiveQuantity = value;
                    }} 
                    defaultValue={text}
                  />
        }
      },
      {
        title: '生产批号',
        dataIndex: 'productBatchNo',
        render: (text,record,index)=>{
          return <Input 
                  onChange={(e)=>{
                    record.productBatchNo = e.target.value;
                  }} 
                  defaultValue={text}
                  />
        }
      },
      {
        title: '生产日期',
        dataIndex: 'realProductTime',
        render: (text,record,index)=> {
          return <DatePicker
                  disabledDate={(current) => current && current > moment(record.realValidEndDate)}
                  onChange={(dates, moment) => {
                    record.realProductTime = moment;
                  }}
                  defaultValue={moment(text, 'YYYY-MM-DD')}
                />
        }
      },
      {
        title: '有效期至',
        dataIndex: 'realValidEndDate',
        render: (text,record,index)=> {
          return <DatePicker
                  disabledDate={(current) => current && current < moment(record.realProductTime)}
                  onChange={(dates, moment) => {
                    record.realValidEndDate = moment;
                  }}
                  defaultValue={moment(text, 'YYYY-MM-DD')}
                />
        }
      },
      {
        title: '验收温度',
        dataIndex: 'realAcceptanceTemperature',
        render: (text,record,index)=> {
          return <Input 
                  type="number"
                  onChange={(e)=>{
                    record.realAcceptanceTemperature = e.target.value;
                  }}
                  defaultValue={text || '' } 
                  addonAfter={`℃`}
                />
        }
      },
      {
        title: '包装规格',
        dataIndex: 'packageSpecification',
      },
      {
        title: '剂型',
        dataIndex: 'dosageForm',
      },
      {
        title: '供应商',
        dataIndex: 'supplierName'
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNo'
      },
      {
        title: '操作',
        dataIndex: 'RN',
        render: (text, record)=>{
          return <a onClick={() => {
            this.props.dispatch({
              type: 'wareHouse/addBatch',
              payload: {
                record
              }
            })
          }}>增加验收批号</a>
        }
      }
    ];
    const columnsVerify = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '商品名',
        dataIndex: 'ctmmTradeName'
      },
      {
        title: '规格',
        dataIndex: 'ctmmSpecification',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产厂家',
        dataIndex: 'ctmmManuFacturerName'
      },
      {
        title: '单位',
        dataIndex: 'limitDrugUnit',
      },
      {
        title: '配送数量',
        dataIndex: 'realDeliveryQuantiry'
      },  
      {
        title: '实到数量',
        dataIndex: 'realReceiveQuantity'
      },
      {
        title: '生产批号',
        dataIndex: 'productBatchNo'
      },
      {
        title: '生产日期',
        dataIndex: 'realProductTime'
      },
      {
        title: '有效期至',
        dataIndex: 'realValidEndDate'
      },
      {
        title: '验收温度',
        dataIndex: 'realAcceptanceTemperature'
      },
      {
        title: '包装规格',
        dataIndex: 'packageSpecification',
      },
      {
        title: '剂型',
        dataIndex: 'dosageForm',
      },
      {
        title: '供应商',
        dataIndex: 'supplierName'
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNo'
      }
    ];
    
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>配送单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailInfo.distributeCode || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>订单号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailInfo.orderCode || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailInfo.statusName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailInfo.typeName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailInfo.supplierName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>收货地址</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailInfo.deptAddress || ''}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Tabs defaultActiveKey={defaultActiveKey} onChange={this.tabsChange} tabBarExtraContent={ btnShow? <Button type='primary' onClick={this.saveCheck}>确认验收</Button> : null}>
            <TabPane tab="待验收" key="1">
              <Table
                bordered
                loading={loading}
                scroll={{x: '200%'}}
                columns={columnsUnVerfiy}
                dataSource={unVerfiyList}
                pagination={false}
                rowKey={'upUserDate'}
                rowSelection={{
                  selectedRowKeys: this.state.selected,
                  onChange: this.rowChange
                }}
              />
            </TabPane>
            <TabPane tab="已验收" key="2">
              <Table
                loading={loading}
                bordered
                scroll={{x: '250%'}}
                columns={columnsVerify}
                dataSource={verifyList}
                rowKey={'upUserDate'}
                pagination={false}
              />
            </TabPane>
          </Tabs>
         
        </div>
      </div>
    )
  }
}
export default connect(state=>state.wareHouse)(PslistCheck);
