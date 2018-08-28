/*
 * @Author: wwb 
 * @Date: 2018-08-21 14:27:32 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-27 20:19:56
 */

 /**
 * @file 系统管理--组织机构--用户管理
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Select, Button, Icon, Popconfirm, Modal } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import { systemMgt } from '../../../../api/systemMgt';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
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

class SearchForm extends PureComponent{
  state = {
    display: 'none'
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }
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
    const { display, expand } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`账号`}>
              {
                getFieldDecorator(`userNo`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`姓名`}>
              {
                getFieldDecorator(`userName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`所属科室`}>
              {
                getFieldDecorator(`deptGuid`,{
                  initialValue: ''
                })(
                  <Select>
                    <Option value=''>全部</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`部门`}>
              {
                getFieldDecorator(`department`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入'/>
                )
              }
            </FormItem>
          </Col>
          <Col span={expand ? 16: 8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
             {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
           </a>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);
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
class UserMgt extends PureComponent{
  state = {
    loading: false,
    visible: false,
    query: {}
  }
  queryHandle = (query) =>{
    this.refs.table.fetch(query);
    this.setState({ query });
  }
  // 修改
  modify = (record,index) =>{
    this.setState({ visible: true });
    console.log(record,index,'modify');
    const setFields = ['jobNum','loginName','userName','tel','mobile'];
    let Fields = {};
    setFields.map((item,index)=> Fields[item] = record[item]);
    this.props.form.setFieldsValue(Fields);
  }
  // 删除
  resetPwd = (record,index) =>{
    console.log(record,index,'resetPwd');
    this.props.dispatch({
      type: 'organization/ResetPwd',
      payload: { id: record.id },
      callback: () =>{
        this.refs.table.fetch(this.state.query);
      }
    })
  }
  save = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        console.log(values,'values')
      }
    })
  }
  add = () =>{
    const { history } = this.props;
    history.push({ pathname: '/system/organization/userMgt/add' })
  }
  render(){
    console.log(this.props,'props')
    const { visible, query } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '账号',
        dataIndex: 'loginName',
      },
      {
        title: '姓名',
        dataIndex: 'userName',
      },
      {
        title: '所属科室',
        dataIndex: 'hisCtDeptNme',
      },
      {
        title: '部门',
        dataIndex: 'deptName',
      },
      {
        title: '编辑人',
        dataIndex: 'updateUserName',
      },
      {
        title: '编辑时间',
        dataIndex: 'updateDate',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text,record,index)=>{
          return <span>
            <Popconfirm title="是否确认重置该用户密码?" onConfirm={this.resetPwd.bind(null, record,index)} okText="是" cancelText="否">
              <a>重置密码</a>
            </Popconfirm>
            <a onClick={this.modify.bind(null,record,index)} style={{ marginLeft: 8 }}>编辑</a>
          </span>
        }
      },
    ]
    return (
      <div className='ysynet-main-content'>
        <WrapperForm query={this.queryHandle}/>
        <div style={{ marginBottom: 24 }}>
          <Button type='primary' icon='plus' onClick={this.add}>新增用户</Button>
        </div>
        <RemoteTable
          ref='table'
          columns={columns}
          bordered
          query={query}
          url={systemMgt.FINDUSERLIST}
          scroll={{x: '100%'}}
          rowKey={'id'}
        />
        <Modal
          title={'用户修改'}
          width={488}
          visible={visible}
          onCancel={()=>this.setState({ visible: false })}
          footer={[
            <Button key="submit" htmlType='submit' type='primary' onClick={this.save}>
                确认
            </Button>,
            <Button key="back"  type='default' onClick={()=>this.setState({ visible: false })}>取消</Button>
          ]}
        >
          <Form onSubmit={this.onSubmit}>
            <FormItem {...singleFormItemLayout} label={`工号`}>
              {
                getFieldDecorator(`jobNum`,{
                  rules: [{ required: true,message: '请填写工号' }]
                })(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`姓名`}>
              {
                getFieldDecorator(`userName`,{
                  rules: [{ required: true,message: '请填写姓名' }]
                })(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`登录名`}>
              {
                getFieldDecorator(`loginName`,{
                  rules: [{ required: true,message: '请填写登录名' }]
                })(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`电话`}>
              {
                getFieldDecorator(`tel`)(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`手机`}>
              {
                getFieldDecorator(`mobile`)(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`备注`}>
              {
                getFieldDecorator(`tfRemark`)(
                  <TextArea rows={3}/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default connect( state => state)(Form.create()(UserMgt));