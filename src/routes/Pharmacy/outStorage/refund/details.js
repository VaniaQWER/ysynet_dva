/*
 * @Author: yuwei  退货详情 /refund/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col , Tooltip, Button , Modal} from 'antd';
import { createData } from '../../../../common/data';
import { Link } from 'react-router-dom';
const columns = [
  {
    title: '通用名称',
    width:100,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '规格',
    width:150,
    dataIndex: 'spec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '入库单号',
    width:150,
    dataIndex: 'planTime7788',
  },
  {
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
    render:(text)=>'0.25gX12片'
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'unit123123',
    render:(text)=>'瓶'
  },
  {
    title: '出库数量',
    width:150,
    dataIndex: 'unit1999888',
    render:(text)=>'120'
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'applyNo',
  },
  {
    title: '生产日期',
    width:150,
    dataIndex: 'planTime555',
  },
  {
    title: '有效期至',
    width:150,
    dataIndex: 'planTime123',
    render:(text,record)=>`${record.planTime}`
  },
  {
    title: '生产厂家',
    width:150,
    dataIndex: 'productCompany',
  },
  {
    title: '批准文号',
    width:150,
    dataIndex: 'approvalNo',
  }
];
const Confirm = Modal.confirm;
class DetailsRefund extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      visible:false,
      fstate:true,
    }
  }
  //确认退货
  saleReturn = ()=>{
    Confirm({
      content:'您确定要执行此操作吗？',
      onOk:()=>{
        const { history } = this.props;
        history.push({pathname:"/pharmacy/outStorage/refund"});
      }
    })
  }

  //复核通过
  onPass = () => {
    Confirm({
      content:'您确定要执行此操作吗？',
      onOk:()=>{
        const { history } = this.props;
        history.push({pathname:"/pharmacy/outStorage/refund"});
      }
    })
  }

  render(){
    const { fstate } = this.state;
    return (
      <div  className='ysynet-main-content bgf'>
          <h3>单据信息

          <div style={{float:'right'}}>
          {
            fstate?
            (
              <div style={{float:'right'}}>
                <Button type='primary' className='button-gap' onClick={()=>this.onPass()}>复核通过</Button>
                <Button type='danger' onClick={()=>this.setState({fstate:false})}>不通过</Button>
              </div>
            ):
            (
              <div style={{float:'right'}}>
                <Button type='primary' className='button-gap'>
                <Link to={{'pathname':'/pharmacy/outStorage/refund/add'}}>编辑</Link></Button>
                <Button type='danger' onClick={()=>this.saleReturn()}>确认退货</Button>
              </div>
            )
          }
          </div>
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
                    <label>配货部门</label>
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
                  <div className='ant-form-item-control'>2015-09-03 15:00:02</div>
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
                  <div className='ant-form-item-control'>123</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>复核时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>123</div>
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
            style={{marginTop: 24}}
            pagination={{
              size: "small",
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
      </div>
    )
  }
}
export default DetailsRefund;