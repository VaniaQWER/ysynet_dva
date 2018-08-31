/*
 * @Author: wwb 
 * @Date: 2018-07-24 20:15:54 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 16:33:15
 */
/* 
  @file 补货计划  计划审核 -- 详情
*/
import React, { PureComponent } from 'react';
import { Table ,Row, Col,Tooltip, Button, Modal } from 'antd';
import { connect } from 'dva';
const columns = [
  {
    title: '通用名称',
    width: 180,
    dataIndex: 'ctmmGenericName',
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
    width: 270,
    dataIndex: 'packageSpecification',
  },
  {
    title: '单位',
    width: 90,
    dataIndex: 'replanUnit',
  },
  {
    title: '需求数量',
    dataIndex: 'demandQuantity',
  },
  {
    title: '价格',
    dataIndex: 'drugPrice',
    render: (text,reocrd) =>{
      return text === undefined || text === null ? '0': text
    }
  },
  {
    title: '金额',
    dataIndex: 'totalPrice',
  },
  {
    title: '生产厂家',
    width: 200,
    dataIndex: 'ctmmManufacturerName',
  },
  {
    title: '供应商',
    width: 200,
    dataIndex: 'supplierName',
  },
  {
    title: '批准文号',
    width: 180,
    dataIndex: 'approvalNo',
  },
];
class PlanCheckDetail extends PureComponent{
  state = {
    detailsData: {},
    loading: false
  }
  componentDidMount = () => {
    let { planCode } = this.props.match.params;
    this.setState({ loading: true });
    this.props.dispatch({
      type:'base/ReplenishDetails',
      payload: { planCode },
      callback:(data)=>{
        this.setState({ detailsData: data, loading: false });
      }
    });
  }
  // 审核通过
  pass = () =>{
    const that = this;
    Modal.confirm({
      title: '通过',
      content: '是否确认通过',
      onOk(){
        console.log(that,'this');
        let values = {}
        values.opType = '4'// 审核通过
        that.update(values);
      }
    })
  }
  // 审核驳回
  reject = () =>{
    const that = this;
    Modal.confirm({
      title: '驳回',
      content: '是否确认驳回',
      onOk(){
        console.log(that,'this');
        let values = {}
        values.opType = '3'// 审核驳回
        that.update(values);
      }
    })
  }
  // 通过 驳回交互
  update = (values) =>{
    let list = [ this.state.detailsData.planCode ];
    values.list = list;
    let { dispatch, history } = this.props;
    dispatch({
      type: 'replenish/updateStatus',
      payload: { values },
      callback: () =>{
        history.push({ pathname: '/purchase/replenishment/planCheck' });
      } 
    })

  }
  render(){
    const { detailsData, loading } = this.state;
    const { auditStatus } = this.props.match.params;
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display: 'flex',justifyContent: 'space-between' }}>
            <h3>单据信息</h3>
            {
              auditStatus === '2'
              &&
              <div>
                <Button type='primary' onClick={this.pass}>通过</Button>
                <Button type='danger' onClick={this.reject} style={{ marginLeft: 8 }} ghost>驳回</Button>
              </div>
            }
          </div>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>计划单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{ detailsData.planCode }</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{ detailsData.planTypeName }</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{ detailsData.statusName }</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>发起人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.createUserName}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>发起时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.createDate}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>联系电话</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.mobile}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>收货地址</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.receiveAddress}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>审核人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.sheveUserName}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>审核时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.sheveDate}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>驳回说明</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{detailsData.remarks}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            bordered
            title={()=>'产品信息'}
            scroll={{x: '180%'}}
            columns={columns}
            loading={loading}
            dataSource={detailsData ? detailsData.list : []}
            rowKey={'drugCode'}
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
export default connect(state => state)(PlanCheckDetail);
