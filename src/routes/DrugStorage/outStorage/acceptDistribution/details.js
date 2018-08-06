/*
 * @Author: yuwei 配货详情 /picking/details
 * @Date: 2018-07-24 13:16:33 
* @Last Modified time: 2018-07-24 13:16:33 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Card , Button, Modal , Input , Tooltip} from 'antd';
import { createData } from '../../../../common/data';
const Conform = Modal.confirm;


class DetailsPicking extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      visible:true,
      selectedRowKey:[],
      hidden:true,//是否显示操作按钮 true 显示 false 隐藏
    }
  }
  //生成拣货单
  onCreate = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        this.setState({
          hidden:false
        })
      },
      onCancel:()=>{}
    })
  }
  //确认配货/取消
  onSubmit = (bool) =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        this.setState({visible:bool})
        // const { history } = this.props;
        // history.push({pathname:"/drugStorage/drugStorageManage/picking"})
      },
      onCancel:()=>{}
    })
  }

  render(){
    const leftColumns = [
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
        title: '剂型',
        width:150,
        dataIndex: 'fmodal',
      },
      {
        title: '生产厂家',
        width:150,
        dataIndex: 'productCompany',
      },
      {
        title: '单位',
        width:150,
        dataIndex: 'unit',
        render:(text)=>'g'
      },
      {
        title: '申领数量',
        width:150,
        dataIndex: 'unit1',
        render:()=>`100`
      },
      {
        title: '预分配数',
        width:150,
        dataIndex: 'unit2',
        render:()=>`80`
      },
      {
        title: '欠品数量',
        width:150,
        dataIndex: 'unit3',
        render:()=>`20`
      },
      {
        title: '当前库存',
        width:150,
        dataIndex: 'unit4',
        render:()=>`80`
      }
    ];
    const rightColumns =  [
      {
       title: '序号',
       width:80,
       dataIndex: 'index',
       render:(text,record,index)=>`${index+1}`
      },
      {
        title: '生产批号',
        width:150,
        dataIndex: 'medicinalCode',
      },
      {
        title: '生产日期',
        width:100,
        dataIndex: 'planTime'
      },
      {
        title: '有效期至',
        width:150,
        dataIndex: 'planTime1',
        render:(text,record)=>`${record.planTime}`
      },
      {
        title: '可分配数',
        width:150,
        dataIndex: 'fmodal',
        render:(text,record)=>`20`
      },
      {
        title: '分配数',
        width:150,
        dataIndex: 'spec',
        render:(text)=>(
          <Input />
        )
      }
    ];
    const { visible , hidden } = this.state;
    return (
      <div className='fadeIn'>
        <Card>
          <h3>单据信息 
          {
            hidden?
            <div style={{float:'right'}}>
              <Button style={{float:'right'}} onClick={()=>this.onCreate()} disabled={visible}>生成拣货单</Button>
              <Button className='button-gap'  style={{float:'right'}} onClick={()=>this.onSubmit(true)} disabled={visible}>取消</Button>
              <Button type='primary' className='button-gap' style={{float:'right'}} onClick={()=>this.onSubmit(false)}>配货</Button>
            </div>
            :null
          }
            </h3>
          <Row>
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
                <div className='ant-form-item-control'>待配货</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>申领部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>静配中心</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>发起人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>发起时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2015-09-03 15:00:02
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>联系电话</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>13020082008</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>药房地址</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>这是一个药房的地址</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>配货人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>配货时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
          </Row>
          <hr className='hr'/>
          <h3>产品信息</h3>
          <Row>
            <Col span={12} >
              <Table
                dataSource={createData()}
                bordered
                scroll={{x: '100%'}}
                columns={leftColumns}
                rowKey={'id'}
                pagination={{
                  size: 'small',
                  showQuickJumper: true,
                  showSizeChanger: true
                }}
              />
            </Col>
            <Col span={10} offset={2}>
              <Table
                dataSource={createData()}
                bordered
                scroll={{x: '100%'}}
                columns={rightColumns}
                rowKey={'id'}
                pagination={{
                  size: 'small',
                  showQuickJumper: true,
                  showSizeChanger: true
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
export default DetailsPicking;