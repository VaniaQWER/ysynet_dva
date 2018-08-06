/*
 * @Author: yuwei - 药品申领  /drugsFor/add
 * @Date: 2018-07-24 21:35:38 
* @Last Modified time: 2018-07-24 21:35:38 
 */
import React, { PureComponent } from 'react';
import { Table , Col, Card , Select , Button, Modal , message, Input ,  Affix , Row , Tooltip} from 'antd';
import { createData } from '../../../../common/data';
const Conform = Modal.confirm;
const Option = Select.Option;
const columns = [
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
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
    render:(text)=>'g'
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'unit123',
    render:(text)=>'g'
  },
  {
    title: '申领数量',
    width:150,
    dataIndex: 'productCompany2',
    render:()=>(<Input/>)
  },
  {
    title: '药房库存',
    width:150,
    dataIndex: 'productCompany3',
    render:()=>`100`
  },
  {
    title: '库存上限',
    width:150,
    dataIndex: 'productCompany4',
    render:()=>`10000000`
  },
  {
    title: '库存下限',
    width:150,
    dataIndex: 'productCompany5',
    render:()=>`10`
  } 
];
const modalColumns = [  
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
  }
]
class AddDrugsFor extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      selectedRowKey:[],
      visible:false
    }
  }

  //移除
  delete = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('删除成功！')
      },
      onCancel:()=>{}
    })
  }

  //一键添加低库存产品
  add = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
      },
      onCancel:()=>{}
    })
  }
  //提交该出库单
  onSubmit = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/pharmacy/manage/drugsFor"})
      },
      onCancel:()=>{}
    })
  }

  //添加产品 到 主表
  addToMain = () => {
    const { selectedRowKey } =this.state;
    if(selectedRowKey.length>0){
      this.setState({visible:false,selectedRowKey:[]})
      
    }else{
      message.warn('最少选择一个产品添加！')
    }
  }

  render(){
    const { visible , selectedRowKey } = this.state; 
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild' style={{height:70}}>
          <Col span={6}>
           配货部门：
           <Select style={{width:150}}>
            <Option key='01' value='01'>药库</Option>
           </Select>
          </Col>
          <Col span={12}>
            <Button type='primary' className='button-gap' onClick={()=>this.setState({visible:true})}>添加产品</Button>
            <Button className='button-gap' onClick={this.add}>一键添加低库存产品</Button>
            <Button onClick={()=>this.delete()} >删除</Button>
          </Col>
        </div>

        <Card>
          <h3>产品信息</h3>
          <Table
            rowSelection={{
              onChange:(selectedRowKey)=>{
                this.setState({selectedRowKey})
              }
            }}
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
        </Card>
        <Affix offsetBottom={0} className='affix'>共10种产品
         <Button  style={{float:'right'}} onClick={() => this.onSubmit()}>
            保存
          </Button>
          <Button  type="primary" className='button-gap' style={{float:'right'}} onClick={() => this.onSubmit()}>
            提交
          </Button>
        </Affix>

        {/*选择产品-弹窗*/}
        <Modal title='选择页面' visible={visible} width={980}
          onOk={()=>this.addToMain()}
          onCancel={()=>this.setState({visible:false,selectedRowKey:[]})}>
          <Row>
            <Input placeholder='通用名/商品名' style={{width:300}}/>
          </Row>
          <Table
            rowSelection={{
              selectedRowKeys:selectedRowKey,
              onChange:(selectedRowKey)=>{
                this.setState({selectedRowKey})
              }
            }}
            dataSource={createData()}
            bordered
            scroll={{x: '200%'}}
            columns={modalColumns}
            rowKey={'id'}
          />
        </Modal>

      </div>
    )
  }
}
export default AddDrugsFor;
