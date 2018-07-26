/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-24 21:05:03
 */

/**
 * @file 药库 - 补货管理--确认计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Select, Icon, Table  } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles'
import moment from 'moment'; 
import { createData } from '../../../../common/data';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

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
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`计划单号`}>
              {
                getFieldDecorator(`planNo`,{
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
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`申请时间`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: [moment().subtract(30, 'days'), moment(new Date())]
                })(
                  <RangePicker className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
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
          <Col span={expand ? 15: 8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
             {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
           </a>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);
class ConfirmPlan extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    dataSource: createData()
  }
  sendOrder = () =>{
    console.log('sendOrder')
  }
  render(){
    const columns = [{
      title: '计划单号',
      dataIndex: 'planNo',
      width: 180,
      render: (text,record) =>{
        return <span>
          <Link to={{pathname: `/drugStorage/replenishment/confirmPlan/detail`}}>{text}</Link>
        </span>  
      }
    },{
      title: '状态',
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
    },{
      title: '类型',
      dataIndex: 'planType'
    },{
      title: '制单人',
      dataIndex: 'createUser'
    },{
      title: '制单时间',
      dataIndex: 'planTime'
    },{
      title: '申请单号',
      dataIndex: 'applyNo'
    },{
      title: '收货地址',
      dataIndex: 'tfAddress'
    },{
      title: '驳回原因',
      dataIndex: 'planReject'
    }];
    return (
      <div>
         <WrapperForm />
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={()=> this.sendOrder}>发送订单</Button>
         </div>
         <Table 
          columns={columns}
          bordered
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          scroll={{ x: '130%' }}
          rowKey={'id'}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          rowSelection={{
            selectedRowKeys: this.state.selected,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
            }
          }}
         />
      </div>
    )
  }
}
export default ConfirmPlan;