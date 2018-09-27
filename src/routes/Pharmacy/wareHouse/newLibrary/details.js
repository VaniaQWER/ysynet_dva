/*
 * @Author: yuwei  出库管理详情 /newLibrary/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Button, Modal, Spin, message , Tooltip} from 'antd';
import {connect} from 'dva';
const Conform = Modal.confirm;
const columns = [
  {
    title: '通用名',
    width:100,
    dataIndex: 'ctmmGenericName',
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
    title: '单位',
    width:150,
    dataIndex: 'replanUnit'
  },
  {
    title: '入库数量',
    width:150,
    dataIndex: 'inQuantity'
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'lot',
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
    title: '货位',
    width:150,
    dataIndex: 'storeLocName'
  },
  {
    title: '货位类型',
    width:150,
    dataIndex: 'storeTypeName'
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
];

class DetailsNewLibrary extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      info: {},
      loading: false
    }
  }
  componentDidMount() {
    this.setState({loading: true});
    let {id} = this.props.match.params;
    this.props.dispatch({
      type: 'pharmacy/findStoreDetail',
      payload: {
        inStoreCode: id
      },
      callback: (data) => {
        this.setState({
          info: data,
          loading: false
        });
      }
    })
  }
  //打印
  onBPrint = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/pharmacy/manage/newLibrary"})
      },
      onCancel:()=>{}
    })
  }
  //确认
  onSubmit = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/pharmacy/manage/newLibrary"})
      },
      onCancel:()=>{}
    })
  }

  render(){
    let {info, loading} = this.state;
    let {list} = info;
    return (
      <div className='ysynet-main-content' >
        <h3>单据信息 
          <Button style={{float:'right'}} onClick={()=>this.onBPrint()} >导出</Button>
          <Button type='primary' className='button-gap' style={{float:'right'}} onClick={()=>this.onSubmit()}>打印</Button>
        </h3>
        <Spin delay={500} spinning={loading}>
          <Row>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>入库单</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.inStoreCode || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>出库单</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.orderCode || ''}
                  </div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>配货部门</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.deptName || ''}</div>
                </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>入库分类</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.inStoreTypeName || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>申领单</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.applyCode || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>供应商</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.ctmaSupplierName || ''}</div>
                </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>上架人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.upUserName || ''}</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>上架时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{info.upUserDate || ''}
                  </div>
                </div>
            </Col>
          </Row>
        </Spin>
        <hr className='hr'/>
        <h3>产品信息</h3>
        <Table
          loading={loading}
          dataSource={list || []}
          bordered
          scroll={{x: '200%'}}
          columns={columns}
          rowKey={'drugCode'}
          style={{marginTop: 24}}
        />
      </div>
    )
  }
}
export default connect(state=>state)(DetailsNewLibrary);