/*
 * @Author: yuwei  新建入库新建 /newLibrary/add
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table , Col, Button, Modal , message, Input , Affix , Row, Icon , Tooltip } from 'antd';
import { createData } from '../../../../common/data';
const Confirm= Modal.confirm;
const columns = [
  {
    title: '实到数量',
    width:100,
    dataIndex: 'shidaoshuliang',
    render:()=>`100`
  },
  {
    title: '需求数量',
    width:100,
    dataIndex: 'xuqiushuliang',
    render:()=>`100`
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'unit123',
    render:(text)=>'盒'
  },
  {
    title: '通用名称',
    width:100,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '商品名称',
    width:150,
    dataIndex: 'productName',
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
    title: '剂型',
    width:150,
    dataIndex: 'fmodal',
  },
  {
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
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
    dataIndex: 'productCompany',
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'applyNo',
  },
  {
    title: '生产日期',
    width:150,
    dataIndex: 'planTime',
  },
  {
    title: '有效期',
    width:150,
    dataIndex: 'planTime123',
    render:(text,record)=>`${record.planTime}`
  },
  {
    title: '供应商',
    width:150,
    dataIndex: 'createUser',
  }
];
class AddNewLibrary extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      selectedRowKey:[],
    }
  }

  //提交该出库单
  onSubmit = () =>{
    Confirm({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/pharmacy/wareHouse/acceptance"})
      },
      onCancel:()=>{}
    })
  }

  render(){
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild' style={{height:70}}>
          <Col span={6}>
              <Icon type="qrcode" />&nbsp;&nbsp;
              <Input placeholder="输入配送单号/使用条码枪扫描" style={{width:250}}/>
          </Col>
          <Col span={6}>
              备注：
              <Input style={{width:250}}/>
          </Col>
        </div>

        <div className='fullCol-gap-firstChild detailCard'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>出库单</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>PA002211807000086U</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>申领单</label>
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
                  <div className='ant-form-item-control'>待验收</div>
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
                    <label>发起人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>张一山</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>发起时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>验收人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>李飞飞</div>
                </div>
            </Col>
            <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>验收时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
                </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            dataSource={createData()}
            bordered
            title={()=>`产品信息`}
            scroll={{x: '200%'}}
            columns={columns}
            rowKey={'id'}
            pagination={{
              size: "small",
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </div>
        

        <Affix offsetBottom={0} className='affix'>共10种产品
          <Button  type="danger" style={{float:'right'}} onClick={() => this.onSubmit()}>
            不通过
          </Button>
          <Button  type="primary" className='button-gap' style={{float:'right'}} onClick={() => this.onSubmit()}>
            通过
          </Button>
        </Affix>
      </div>
    )
  }
}
export default AddNewLibrary;