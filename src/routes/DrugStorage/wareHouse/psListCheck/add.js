/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-27 11:41:01
 */
/* 
  @file  药库 - 入库--配送单验收-新建
*/
import React, { PureComponent } from 'react';
import {Row, Col, Tooltip, Input, InputNumber, DatePicker, Button, Tabs, Table, message, Icon} from 'antd';
import {connect} from 'dva';
import moment from 'moment';
const {Search} = Input;
const TabPane = Tabs.TabPane;

class PslistAdd extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    detailInfo: {},
    btnShow: false,
    activeKey: "1"
  }
  tabsChange = (key) =>{
    if(key === '2') {
      this.setState({btnShow: false, activeKey: key});
    };
    if(key === '1') {
      this.setState({btnShow: true, activeKey: key});
    };
  }
  addBatch = (record) => {
    let {detailInfo} = this.state;
    detailInfo = JSON.parse(JSON.stringify(detailInfo));
    let index;
    detailInfo.unVerfiyList.map((item, i)=> {
      if(item.upUserDate === record.upUserDate) {
        index = i + 1;
      };
      return item;
    });
    if(record.id === null) {
      record.parentId = record.parentId;
    }else {
      record.parentId = record.id;
    }
    record.id = null;
    record.upUserDate = new Date().getTime();
    record.realReceiveQuantity = '';
    detailInfo.unVerfiyList.splice(index, 0, record);
    this.setState({detailInfo})
  }
  rowChange = (selectedRowKeys, selectedRows) => {
    this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
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
      type: 'base/drugStorageSaveCheck',
      payload: {
        detailList,
        distributeCode: this.props.match.params.id
      },
      callback: (data) => {
        if(data.code === 200) {
          this.setState({loading: true});
          this.props.dispatch({
            type: 'base/deliverRequest',
            payload: {
              distributeCode: this.props.match.params.id
            },
            callback: (data) => {
              this.setState({
                loading: false,
                detailInfo: data,
              });
            }
          })
        }
      }
    })
  }
  search = (value) => {
    this.setState({loading: true})
    this.props.dispatch({
      type: 'base/deliverRequest',
      payload: {
        distributeCode: value,
      },
      callback: (data) => {
        this.setState({
          loading: false,
          detailInfo: data,
          activeKey: data.auditStatus === 1? '1' : '2'
        });
      }
    })
  }
  render(){
    let {detailInfo, loading, btnShow, activeKey} = this.state;
    let {unVerfiyList, verifyList} = detailInfo;
    let columnsUnVerfiy = [
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
        dataIndex: 'ctmmManufacturerName'
      },
      {
        title: '单位',
        dataIndex: 'unit',
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
        title: '包装规格',
        dataIndex: 'packageSpecification',
      },
      {
        title: '剂型',
        dataIndex: 'ctmmDosageFormDesc',
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
            this.addBatch(record);
          }}>增加验收批号</a>
        }
      }
    ];
    let columnsVerify = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '商品名',
        dataIndex: 'ctmmTradeName',
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
        dataIndex: 'ctmmManufacturerName'
      },
      {
        title: '单位',
        dataIndex: 'replanUnit',
      },
      {
        title: '配送数量',
        dataIndex: 'realDeliveryQuantiry'
      },  
      {
        title: '实到数量',
        dataIndex: 'realReceiveQuantiry'
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
        title: '包装规格',
        dataIndex: 'packageSpecification',
      },
      {
        title: '剂型',
        dataIndex: 'ctmmDosageFormDesc',
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
      <div className='fullCol fadeIn' style={{padding: '0 24px 24px', background: 'rgb(240, 242, 245)'}}>
        <div className="fullCol-fullChild" style={{marginLeft: -24, marginRight: -24}}>
          <Row style={{margin: '0 -32px', borderBottom: '1px solid rgba(0, 0, 0, .2)'}}>
            <Col span={8}>
              <h3 style={{padding: '0 0 15px 32px', fontSize: '20px'}}>
                新建验收
              </h3>
            </Col>
            <Col span={16} style={{textAlign: 'right', paddingRight: 32}}>
              <Icon 
                onClick={()=>{
                  this.props.history.go(-1);
                }} 
                style={{cursor: 'pointer', transform: 'scale(2)'}} 
                type="close" 
                theme="outlined" 
              />
            </Col>
          </Row>
          <Row style={{marginTop: 10}}>
            <Col span={8}>
              <div style={{lineHeight: '32px'}} className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-3">
                  <Icon style={{transform: 'scale(1.5,1.5)', paddingRight: 10}} type="barcode" />
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <Search onSearch={this.search} placeholder="扫描或输入配送单/补货计划单号"/>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard' style={{margin: '-10px -6px'}}>
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
        <div className='detailCard' style={{margin: '30px -6px'}}>
          <Tabs 
          activeKey={activeKey}
          tabBarExtraContent={ btnShow && unVerfiyList && unVerfiyList.length? <Button type='primary' onClick={this.saveCheck}>确认验收</Button> : null}
          onChange={this.tabsChange}>
            <TabPane tab="待验收" key="1">
              <Table
                bordered
                loading={loading}
                scroll={{x: '200%'}}
                columns={columnsUnVerfiy}
                dataSource={unVerfiyList || []}
                pagination={false}
                rowKey={'key'}
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
                dataSource={verifyList || []}
                rowKey={'key'}
                pagination={false}
              />
            </TabPane>
          </Tabs>
         
        </div>
        {
          unVerfiyList && unVerfiyList.length > 0? 
          <div className="detailCard">
            <Row>
              <Col span={12}>共<span style={{color: 'red', lineHeight: '32px'}}>{unVerfiyList.length}</span>种产品</Col>
              <Col span={12} style={{textAlign: 'right'}}><Button type='primary' onClick={this.saveCheck}>确认验收</Button></Col>
            </Row>
          </div> : null
        }
      </div>
    )
  }
}
export default connect(state=>state)(PslistAdd);
