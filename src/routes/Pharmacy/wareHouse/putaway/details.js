/*
 * @Author: yuwei  上架详情 /putaway/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Input , Select , Button, Modal , Card , message , Tooltip} from 'antd';
import { createData } from '../../../../common/data';
const Option = Select.Option;
const Conform = Modal.confirm;
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
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
    render:(text)=>'g'
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'unit123',
    render:(text)=>'盒'
  },
  {
    title: '生产厂家',
    width:150,
    dataIndex: 'productCompany1',
    render: (text, record, index) => 'PHXL'
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'productCompany2',
    render: (text, record, index) => index
  },
  {
    title: '生产日期',
    width:150,
    dataIndex: 'productCompany3',
    render: (text, record, index) => '2018-7-25'
  },
  {
    title: '有效期至',
    width:150,
    dataIndex: 'productCompany4',
    render: (text, record, index) => '2018-7-25'
  },
  {
    title: '指示货位',
    width:150,
    dataIndex: 'productCompany23',
    render: (text, record, index) => `A${index+1}`
  },
  {
    title: '货位类型',
    width:150,
    dataIndex: 'productCompany2323',
    render: (text, record, index) => `补货货位`
  },
  {
    title: '实际货位',
    width:150,
    dataIndex: 'productCompany42',
    render: (text, record, index) => (<Select style={{width:'100%'}}><Option key='01' value='01'></Option></Select>)
  },
  {
    title: '指示数量',
    width:150,
    dataIndex: 'productCompany422321',
    render: (text, record, index) => Number(0.6+index)
  },
  
  {
    title: '实际上架数量',
    width:150,
    dataIndex: 'productCompany5s',
    render:(text)=>(<Input defaultValue={1}/>)
  }
];

class DetailsPutaway extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      visible:false,
    }
  }
  //打印
  onPrint = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/pharmacy/wareHouse/putaway"})
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
        history.push({pathname:"/pharmacy/wareHouse/putaway"})
      },
      onCancel:()=>{}
    })
  }

  render(){
    return (
      <div className='fadeIn'>
        <Card>
          <h3>单据信息 
            <Button style={{float:'right'}} onClick={()=>this.onPrint()} >打印</Button>
            <Button type='primary' className='button-gap' style={{float:'right'}} onClick={()=>this.onSubmit()}>上架完成</Button>
          </h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>验收单</label>
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
                <div className='ant-form-item-control'>待上架</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>验收人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>验收时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2015-09-03 15:00:02
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>上架人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>上架时间</label>
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
export default DetailsPutaway;