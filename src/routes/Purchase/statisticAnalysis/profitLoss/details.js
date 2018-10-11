/*
 * @Author: wwb 
 * @Date: 2018-07-24 20:15:54 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 00:16:10
 */
/* 
  @file 损益分析 详情
*/
import React, { PureComponent } from 'react';
import { Table, Row, Col, Tooltip, message } from 'antd';
import { connect } from 'dva';
const columns = [
  {
    title: '货位',
    width: 112,
    dataIndex: 'hw'
  },
  {
    title: '货位类型',
    width: 168,
    dataIndex: 'hwlx'
  },
  {
    title: '通用名',
    width: 168,
    dataIndex: 'ctmmGenericName'
  },
  {
    title: '商品名',
    width: 168,
    dataIndex: 'goodsName'
  },
  {
    title: '规格',
    width: 168,
    dataIndex: 'goodsSpec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '生产厂家',
    width: 224,
    dataIndex: 'producerName',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '单位',
    width: 112,
    dataIndex: 'unit'
  },
  {
    title: '生产批号',
    width: 168,
    dataIndex: 'lot'
  },
  {
    title: '生产日期',
    width: 168,
    dataIndex: 'scrq'
  },
  {
    title: '有效期止',
    width: 168,
    dataIndex: 'yxqz'
  },
  {
    title: '包装规格',
    width: 168,
    dataIndex: 'packageSpecification'
  },
  {
    title: '剂型',
    width: 168,
    dataIndex: 'jx'
  },
  {
    title: '供应商',
    width: 168,
    dataIndex: 'gys'
  },
  {
    title: '药品编码',
    width: 168,
    dataIndex: 'goodsCode'
  },
  {
    title: '批准文号',
    width: 224,
    dataIndex: 'registKey'
  },
  {
    title: '账面库存',
    dataIndex: 'zmkc',
    width: 112
  },
  {
    title: '实际库存',
    width: 112,
    dataIndex: 'sjkc'
  },
  {
    title: '损益数量',
    width: 112,
    dataIndex: 'sysl'
  },
  {
    title: '价格',
    width: 112,
    dataIndex: 'jg'
  },
  {
    title: '实际损益金额',
    width: 168,
    dataIndex: 'sjsyje'
  },
];

class Detail extends PureComponent{
  state = {
    detailsData: {}
  }
  componentDidMount = () => {
    this.getDetail();
  }
  //详情
  getDetail = () => {
    if (this.props.match.params.id) {
      let { id } = this.props.match.params;
      this.props.dispatch({
        type: 'statistics/invoiceDetail',
        payload: {
          invoiceNo: id
        },
        callback: (data) => {
          if(data.code === 200 && data.msg === 'success') {
            this.setState({
              detailsData: data.data
            })
          };
          if(data.msg !== 'success') {
            message.error(data.msg)
          };
        }
      })
    }
  }
  render(){
    const { detailsData } = this.state;
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={8} style={{fontSize: '18px', fontWeight: 500}}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
                <label>部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                <div className='ant-form-item-control'>{detailsData.supplierName}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
                <label>损益单号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                <div className='ant-form-item-control'>{detailsData.settleBillNo}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
                <label>账面总库存</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                <div className='ant-form-item-control'>{detailsData.invoiceNo}</div>
              </div>
            </Col>
            <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
              <label>实际总库存</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className='ant-form-item-control'>{detailsData.invoiceCode}</div>
            </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
                <label>损益总数量</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                <div className='ant-form-item-control'>{detailsData.invoiceTime}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
                  <label>实际总损益金额</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                <div className='ant-form-item-control'>{detailsData.invoiceAmount}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-7">
                  <label>生成时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                <div className='ant-form-item-control'>{detailsData.settleDate}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            title={()=>'损益信息'}
            scroll={{x: 3168}}
            columns={columns}
            rowKey={'id'}
            bordered
            dataSource={detailsData.billdetaillist ? detailsData.billdetaillist : []}
            pagination={false}
          />
        </div>
      </div>
    )
  }
}
export default connect(state => state)(Detail);
