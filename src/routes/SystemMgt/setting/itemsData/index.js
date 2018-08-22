/*
 * @Author: wwb 
 * @Date: 2018-08-21 15:45:52 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-21 16:41:36
 */
 /**
 * @file 系统管理--系统设置--字典管理
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Select, Button, Table, Popconfirm, Modal } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
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
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={6}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator(`type`,{
                  initialValue: ''
                })(
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                    <Option value=''>请选择</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label={`描述`}>
              {
                getFieldDecorator(`userName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' style={{ width: 200 }} />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <Button type='primary' htmlType='submit'>查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);
let dataSource = [];
for(let i=0; i<20; i++){
  dataSource.push({
    id: i,
    keyValue: i,
    tag: i%3 === 0 ? '待审核': i%2 === 0? '完成': '上架完成',
    type: i%3 === 0 ? 'audit_plan_status': i%2 === 0? 'audit_status': 'first_level_department',
    describe: i%3 === 0 ? '计划审核列表': i%2 === 0? '上架类型': '模块标识',
    sort: i +"0"
  })
}


class ItemsData extends PureComponent{
  state = {
    visible: false,
    isDisabled: false,
    query: {}
  }
  queryHandle = (query) =>{
    this.setState({ query });
    // this.refs.table.fetch(query);
  }
  // 修改
  modify = (record,index) =>{
    console.log(record,index,'modify');
    this.setState({ visible: true,isDisabled: false });
    const setFields = ['keyValue','tag','type','describe','sort'];
    let Fields = {};
    setFields.map((item,index)=> Fields[item] = record[item]);
    this.props.form.setFieldsValue(Fields);
  }
  // 删除
  delete = (record,index) =>{
    console.log(record,index,'delete')
  }
  // 添加键值对
  addkeyValue = (record,index) =>{
    console.log(record,index,'addkeyValue');
    this.props.form.setFieldsValue({ type: record.type,describe: record.describe,sort: record.sort, keyValue: '', tag: '' });
    this.setState({ visible: true, isDisabled: true });
  }
  render(){
    const { visible,isDisabled } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '键值',
        dataIndex: 'keyValue',
        width: 90,
        render: (text,record,index)=>{
          return index
        }
      },
      {
        title: '标签',
        dataIndex: 'tag',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '描述',
        dataIndex: 'describe',
       
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text,record,index)=>{
          return <span>
            <a onClick={this.modify.bind(null,record,index)} style={{ marginRight: 8 }}>修改</a>
            <Popconfirm title="是否确认删除此条记录?" onConfirm={this.delete.bind(null, record)} okText="是" cancelText="否">
              <a>删除</a>
            </Popconfirm>
            <a onClick={this.addkeyValue.bind(null,record,index)} style={{ marginLeft: 8 }}>添加键值对</a>
          </span>
        }
      },
    ]
    return (
      <div className='ysynet-main-content'>
        <WrapperForm query={this.queryHandle}/>
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
          style={{marginTop: 20}}
          dataSource={dataSource}
        />
        <Modal
          title={'字典修改'}
          width={488}
          visible={visible}
          onCancel={()=>this.setState({ visible: false,isDisabled: false })}
          footer={[
            <Button key="submit" type='primary' onClick={this.newAdd}>
                确认
            </Button>,
            <Button key="back"  type='default' onClick={()=>this.setState({ visible: false, isDisabled: false })}>取消</Button>
          ]}
        >
          <Form>
            <FormItem {...singleFormItemLayout} label={`键值`}>
              {
                getFieldDecorator(`keyValue`)(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`标签`}>
              {
                getFieldDecorator(`tag`)(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`类型`}>
              {
                getFieldDecorator(`type`)(
                  <Input disabled={isDisabled}/>
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`描述`}>
              {
                getFieldDecorator(`describe`)(
                  <Input disabled={isDisabled}/>
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`排序`}>
              {
                getFieldDecorator(`sort`)(
                  <Input disabled={isDisabled}/>
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`备注`}>
              {
                getFieldDecorator(`tfRemark`)(
                  <TextArea rows={2}/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(ItemsData);