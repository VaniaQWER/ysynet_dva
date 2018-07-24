/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-24 19:13:36
 */

/**
 * @file 药库 - 补货管理--补货计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Select, Icon, Table, message  } from 'antd';
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
            <FormItem {...formItemLayout} label={`制单时间`}>
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
class ReplenishmentPlan extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    dataSource: createData()
  }
  delete = () =>{
    const dataSource = this.state.dataSource;
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      this.setState({ loading: true });
      let result = [];
      dataSource.map( (item, index) => {
        const a = selected.find( (value, index, arr) => {
        return value === item.id;
        })
        if (typeof a === 'undefined') {
            return result.push(item)
        }
        return null;
    })
      setTimeout(()=>{
        this.setState({dataSource: result,loading: false,selected:[],selectedRows: []});
      },500)
    }
  }
  render(){
    const columns = [{
      title: '计划单号',
      dataIndex: 'planNo',
      render: (text,record) =>{
        return <a>{text}</a>
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
            <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/drugStorage/replenishment/replenishmentPlan/add` })}>新建补货计划</Button>
            <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>删除</Button>
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
export default ReplenishmentPlan;