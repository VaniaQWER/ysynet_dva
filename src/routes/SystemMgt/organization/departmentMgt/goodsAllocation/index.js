/*
 * @Author: yuwei 
 * @Date: 2018-08-22 15:34:09 
* @Last Modified time: 2018-08-22 15:34:09 
 */
 /**
 * @file 系统管理--组织机构--部门管理--货位goodsAllocation
 */

import React , { PureComponent } from 'react';
import {Form , Button , Row , Col, Input , Table , Select , Modal} from 'antd';
import { formItemLayout } from '../../../../../utils/commonStyles';
const FormItem = Form.Item;
const Option = Select.Option;
const singleFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
}


let dataSource = [];
for( let i = 0; i<20; i++ ){
  dataSource.push({
    id: i,
    userNo: `sd_admin${i}`,
    name: `sd_admin${i}`,
    deptName: '武大科室',
    department: '财务科',
    userName: `唐僧${i}`,
    editMan: '苏努悟空',
    editTime: '2018-08-21-17:00'
    
  })
}

class GoodsAllocation extends PureComponent{

  state={
    loading:false,
    visible:false,
    modalTitle:"新增",
    record:{},//当前要编辑的信息
  }
  //新加货位 - 打开弹窗
  add = () => {
    this.props.form.resetFields();
    this.setState({visible:true,modalTitle:"新增"})
  }

  //新加货位 -提交表单
  onSubmitModal = () => {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        console.log(values)
      }
    })
  }

  //新加货位 -关闭弹窗
  onCancelModal = () => {
    this.props.form.resetFields();
    this.setState({visible:false})
  }

  //编辑货位-
  editModal=(record)=>{
    this.setState({record,visible:true,modalTitle:'编辑'})
    const { userNo , userName , loginName } = record
    this.props.form.setFieldsValue({ userNo , userName , loginName })
  }

  render(){
    const { visible , modalTitle } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '货位名称',
        dataIndex: 'userNo',
      },
      {
        title: '货位类型',
        dataIndex: 'remark',
      },
      {
        title: '货位责任人',
        dataIndex: 'editMan',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text,record,index)=>{
          return <span>
            <a onClick={()=>this.editModal(record)}>编辑</a>
          </span>
        }
      }
    ]

    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <Button type='primary' icon='plus' onClick={this.add}>新加货位</Button> 
        </div>
        <div className='detailCard'>
          <Row>
            <Col span={6} style={{fontSize:18,marginTop:5}}>
            货位信息
            </Col>
            <Col span={18}>
              <WrapperForm></WrapperForm>
            </Col>
          </Row>
          <Table 
            columns={columns}
            bordered
            loading={this.state.loading}
            scroll={{x: '100%'}}
            rowKey={'id'}
            pagination={{
              size: "small",
              showQuickJumper: true,
              showSizeChanger: true
            }}
            rowSelection={{
              onChange:(selectRowKeys, selectedRows)=>{
                this.setState({selectRowKeys})
              }
            }}
            style={{marginTop: 20}}
            dataSource={dataSource}
          />
        </div>

        <Modal 
          visible={visible}
          title={modalTitle}
          onOk={this.onSubmitModal}
          onCancel={this.onCancelModal}
        >
          <Form onSubmit={this.onSubmit}>
            <FormItem {...singleFormItemLayout} label={`货位名称`}>
              {
                getFieldDecorator(`userNo`,{
                  rules: [{ required: true,message: '请输入货位名称' }]
                })(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`货位类型`}>
              {
                getFieldDecorator(`userName`,{
                  rules: [{ required: true,message: '请输入货位类型' }]
                })(
                  <Select>
                    <Option key='0' value='0'>货位类型</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`责任人`}>
              {
                getFieldDecorator(`loginName`)(
                  <Select>
                    <Option key='0' value='0'>责任人1</Option>
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(GoodsAllocation) ; 



class SearchForm extends PureComponent{

  handleSearch = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        console.log(values,'查询数据');
        this.props.query(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Col span={9}>
            <FormItem {...formItemLayout} label={`货位名称`}>
              {
                getFieldDecorator(`deptName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem {...formItemLayout} label={`货位类型`}>
              {
                getFieldDecorator(`userName`,{
                  initialValue: ''
                })(
                  <Select>
                    <Option value='0' key='0'>货位类型</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={6} style={{textAlign: 'right', marginTop: 4}}>
            <Button type="primary" className='button-gap'  htmlType="submit">搜索</Button>
            <Button type='default' className='button-gap' onClick={this.handleReset}>重置</Button>
           </Col>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);