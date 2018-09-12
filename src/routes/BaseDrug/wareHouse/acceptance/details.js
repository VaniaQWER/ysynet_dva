/*
 * @Author: yuwei  出库管理详情 /newLibrary/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Tabs, Tooltip, Button, message } from 'antd';
import querystring from 'querystring';
import {connect} from 'dva';
const columns = [
  {
    title: '实到数量',
    width:100,
    dataIndex: 'realReceiveQuantity'
  },
  {
    title: '需求数量',
    width:100,
    dataIndex: 'realDeliveryQuantiry'
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'replanUnit'
  },
  {
    title: '通用名',
    width:100,
    dataIndex: 'ctmmGenericName'
  },
  {
    title: '商品名',
    width:150,
    dataIndex: 'ctmmTradeName',
  },
  {
    title: '规格',
    width:150,
    dataIndex: 'ctmmSpecification',
    className:'ellipsis',
    render: (text)=>(
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
    dataIndex: 'packageSpecification',
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
    dataIndex: 'ctmmManufacturerName',
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'batchNo',
  },
  {
    title: '生产日期',
    width:150,
    dataIndex: 'productDate',
  },
  {
    title: '有效期至',
    width:150,
    dataIndex: 'validEndDate'
  },
  {
    title: '供应商',
    width:150,
    dataIndex: 'supplierName',
  }
];
const {TabPane} = Tabs;
class DetailsNewLibrary extends PureComponent{
  constructor(props){
    super(props)
    let info = querystring.parse(this.props.match.params.id);
    this.state={
      checkLoading: false,
      detailInfo: {},
      defaultActiveKey: info.state,
      btnShow: info.state === '1'? true : false,
      loading: false,
      id: info.id,
      info: {},
      selected: []
    }
  }

  componentDidMount() {
    this.queryDetail()
  }

  queryDetail() {
    this.setState({loading: true});
    this.props.dispatch({
      type: 'wareHouse/getCheckDetail',
      payload: {
        acceptanceCode: this.state.id
      },
      callback: (data) => {
        this.setState({
          loading: false,
          info: data
        })
      }
    })
  }

  rowChange = (selectedRowKeys, selectedRows) => {
    this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
  }

  saveCheck = () => {
    let {selected, info} = this.state;
    let {acceptanceCode} = info;
    if(selected.length === 0) {
      message.error('至少选择一条数据');
      return;
    };
    this.setState({
      checkLoading: true
    });
    let rommAcceptList = selected.map(item=>{
      return {
        id: item
      }
    });
    this.props.dispatch({
      type: 'base/saveCheck',
      payload: {
        rommAcceptList,
        acceptanceCode
      },
      callback: (data) => {
        message.success('确认验收成功');
        this.setState({
          checkLoading: false
        });
        this.queryDetail();
      }
    })
  }

  tabsChange = (key) =>{
    let {info} = this.state;
    let {listUnCheck} = info;
    if(key === '2') {
      this.setState({btnShow: false});
    };
    if(key === '1' && listUnCheck !== undefined && listUnCheck.length !== 0) {
      this.setState({btnShow: true});
    };
  }

  render(){
    let {defaultActiveKey, btnShow, loading, info, checkLoading } = this.state;
    let {listCheck, listUnCheck} = info;
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
                  <div className='ant-form-item-control'>{info.outStoreCode || ''}</div>
                </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>申领单</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{info.acceptanceCode || ''}</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>状态</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{info.acceptStatusName || ''}</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>配货部门</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{info.department || ''}</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>发起人</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{info.createUserName || ''}</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>发起时间</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{info.createDate || ''}</div>
                  </div>
              </Col>
              <Col span={8}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                      <label>验收时间</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{info.receptionTime || ''}</div>
                  </div>
              </Col>
            </Row>
          </div>
        <div className='detailCard'>
          <Tabs defaultActiveKey={defaultActiveKey} onChange={this.tabsChange} tabBarExtraContent={ btnShow && listUnCheck && listUnCheck.length > 0? <Button loading={checkLoading} type='primary' onClick={this.saveCheck}>确认验收</Button> : null}>
            <TabPane tab="待验收" key="1">
              <Table
                bordered
                loading={loading}
                scroll={{x: true}}
                columns={columns}
                dataSource={listUnCheck || []}
                pagination={false}
                rowKey={'id'}
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
                scroll={{x: true}}
                columns={columns}
                dataSource={listCheck || []}
                rowKey={'realReceiveStore'}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default connect(state=>state)(DetailsNewLibrary);