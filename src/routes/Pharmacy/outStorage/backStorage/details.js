/*
 * @Author: yuwei  退货详情 /refund/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Button, Modal , message , Tooltip , Card } from 'antd';
import { createData } from '../../../../common/data';
const Conform = Modal.confirm;
const columns = [
  {
    title: '通用名称',
    width: 180,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '规格',
    width: 150,
    dataIndex: 'spec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '入库单号',
    width: 150,
    dataIndex: 'medicinalCode',
  },
  {
    title: '包装规格',
    width: 150,
    dataIndex: 'fmodal',
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 'unit',
    render:(text)=>'g'
  },
  {
    title: '出库数量',
    width: 150,
    dataIndex: 'approvalNo1',
    render:()=>`6`
  },
  {
    title: '生产批号',
    width: 150,
    dataIndex: 'planNo',
  },
  {
    title: '生产日期',
    width: 150,
    dataIndex: 'planTime',
  },
  {
    title: '有效期至',
    width: 150,
    dataIndex: 'planTime23',
    render:(text,record)=>record.planTime
  },
  {
    title: '生产厂家',
    width: 180,
    dataIndex: 'productCompany',
  },
  {
    title: '批准文号',
    width: 180,
    dataIndex: 'approvalNo',
  }
];

class DetailsRefund extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      visible:false,
    }
  }
  onBan = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/drugStorage/outStorage/backStorage"})
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
        history.push({pathname:"/drugStorage/outStorage/backStorage"})
      },
      onCancel:()=>{}
    })
  }

  render(){
    return (
      <div className='fadeIn ysynet-content'>
        <Card>
          <h3>单据信息 
            <Button style={{float:'right'}} onClick={()=>this.onBan()} >不通过</Button>
            <Button type='primary' className='button-gap' style={{float:'right'}} onClick={()=>this.onSubmit()}>复核通过</Button>
          </h3>
          <Row>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>退货单</label>
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
                  <div className='ant-form-item-control'>待复核</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>来源部门</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>药库</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>退货人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>张三三</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>退货时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>2015-09-03 15:00:02
                  </div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>供应商</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>供应商的名称名称</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>复核人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'></div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>复核时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'></div>
                </div>
            </Col>
          </Row>
         
         <hr className='hr'/>
         <h3>产品信息</h3>
        <Table  
          dataSource={createData()}
          bordered
          scroll={{x: '200%'}}
          columns={columns}
          rowKey={'id'}
          pagination={{
            size: 'small',
            showQuickJumper: true,
            showSizeChanger: true
          }}
        />
      </Card>
      </div>
    )
  }
}
export default DetailsRefund;