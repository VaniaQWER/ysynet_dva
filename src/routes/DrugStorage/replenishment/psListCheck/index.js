/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-24 21:41:39
 */

/**
 * @file 药库 - 补货管理--配送单验收
 */
import React, { PureComponent } from 'react';
import { Form, Input, Row, Col, Select, Button, Table } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles'
import { Link } from 'react-router-dom';
import { createData } from '../../../../common/data';
const FormItem = Form.Item;
const { Option } = Select;
let data = createData();
let dataSource =  data.map(item=> {
  item.checkUser = '高晓松'
  item.checkTime = '2018-07-22 18:33';
  return item
});
const columns = [
  {
   title: '配送单号',
   width:150,
   dataIndex: 'medicinalCode',
   render: (text,record) =>{
     return <span>
        <Link to={{pathname: `/drugStorage/replenishment/psListCheck/detail`}}>{text}</Link>
      </span>
   }
  },
  {
    title: '订单号',
    width:140,
    dataIndex: 'planNo',
  },
  {
    title: '供应商',
    width:120,
    dataIndex: 'fOrgName',
  },
  {
    title: '状态',
    width:100,
    dataIndex: 'fstate',
    render: (text,record) =>{
      if(text === '00'){
        return '待确认'
      }else if( text === '01' ){
        return '采购中'
      }else if(text === '09'){
        return '已驳回'
      }else{
        return ''
      }
    }
  },
  {
    title: '类型',
    width: 100,
    dataIndex: 'planType',
  },
  {
    title: '收货地址',
    dataIndex: 'tfAddress',
    width: 300
  },
  {
    title: '制单人',
    width: 150,
    dataIndex: 'createUser',
  },
  {
    title: '制单时间',
    width: 150,
    dataIndex: 'planTime',
  },
  {
    title: '验收人',
    width: 120,
    dataIndex: 'checkUser',
  },
  {
    title: '验收时间',
    width:150,
    dataIndex: 'checkTime',
  }
];

class SearchForm extends PureComponent{
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`配送单号`}>
              {
                getFieldDecorator(`planNo`,{
                  initialValue: ''
                })(
                  <Input placeholder='扫描配送单二维码或输入配送单号' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`供应商`}>
              {
                getFieldDecorator(`fOrgName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value=''>请选择</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('type',{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value=''>全部</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={15} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);
class DistributionCheck extends PureComponent{
  state = {
    dataSource: dataSource
  }
  
  render(){
    return (
      <div>
         <WrapperForm />
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/drugStorage/replenishment/psListCheck/add` })}>新建验收</Button>
         </div>
         <Table 
          columns={columns}
          bordered
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          scroll={{ x: '150%' }}
          rowKey={'id'}
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
export default DistributionCheck;