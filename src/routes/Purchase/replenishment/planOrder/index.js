/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 13:09:20
 */

/**
 * @file 药库 - 补货管理--计划计划
 */
import React, { PureComponent } from 'react';
import { Form, Button, message, Tooltip, DatePicker, Select, Row, Col, Input, Icon  } from 'antd';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
import { createData } from '../../../../common/data';
import { replenishmentPlan } from '../../../../api/replenishment/replenishmentPlan';
import { connect } from 'dva';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },//5
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  },
};
class SearchForm extends PureComponent{
  state = {
    display: 'none',
    supplierList: []
  }
  componentWillMount = () =>{
    let { dispatch } = this.props;
    dispatch({
      type: 'replenish/supplierList',
      payload: {},
      callback: (data) =>{
        this.setState({ supplierList: data })
      }
    })
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.startTime = values.orderTime[0].format('YYYY-MM-DD');
        values.endTime = values.orderTime[1].format('YYYY-MM-DD');
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand,supplierList } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`订单号`}>
              {
                getFieldDecorator(`orderCode`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入'/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`供应商`}>
              {
                getFieldDecorator(`supplierCodeList`,{
                  initialValue: ''
                })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                    <Option key={-1} value=''>请选择</Option>
                    {
                      supplierList.map((item,index) => <Option key={index} value={item.ctmaSupplierCode}>{item.ctmaSupplierName}</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`下单时间`}>
              {
                getFieldDecorator(`orderTime`,{
                  initialValue: ''
                })(
                  <RangePicker format={'YYYY-MM-DD'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`订单状态`}>
              {
                getFieldDecorator(`orderStatus`,{
                  initialValue: ''
                })(
                  <Select>
                    <Option key={-1} value=''>全部</Option>
                    <Option key={1} value='1'>待确认</Option>
                    <Option key={2} value='2'>备货中</Option>
                    <Option key={3} value='3'>订单完成</Option>
                    <Option key={4} value='4'>关闭订单</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`订单类型`}>
              {
                getFieldDecorator('orderType',{
                  initialValue: ''
                })(
                  <Select>
                    <Option value=''>全部</Option>
                    <Option value='1'>零库存补货</Option>
                    <Option value='2'>报告药</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={expand ? 8: 24} style={{ textAlign: 'right', marginTop: 4}} >
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
class PlanOrder extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    query: {},
    dataSource: createData()
  }
  queryHandler = query => {
    this.setState({ query });
    this.refs.table.fetch(query);
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
  sendOrder = () =>{
    const selected = this.state.selected;
    if (selected.length === 0) {
     return message.warn('请至少选择一条数据')
    }
    this.setState({ loading: true });
  }
  render(){
    const { loading, query } = this.state;
    const columns = [{
      title: '订单号',
      dataIndex: 'orderCode',
      width: 180,
      render: (text,record) =>{
        return <span>
          <Link to={{pathname: `/purchase/replenishment/planOrder/detail${record.orderCode}`}}>{text}</Link>
        </span>  
      }
    },{
      title: '订单状态',
      dataIndex: 'orderStatusName',
      width: 90,
    },{
      title: '订单类型',
      dataIndex: 'orderTypeName',
      width: 100
    },{
      title: '供应商',
      dataIndex: 'supplierName'
    },{
      title: '下单人',
      dataIndex: 'createUserName'
    },{
      title: '下单时间',
      dataIndex: 'createDate'
    },{
      title: '收货地址',
      dataIndex: 'receiveAddress',
      width: 270,
      className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
    },];
    return (
      <div className='ysynet-main-content'>
         <WrapperForm 
            query={this.queryHandler}
            dispatch={this.props.dispatch}
          />
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={this.sendOrder} loading={loading}>发送订单</Button>
            <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>关闭订单</Button>
         </div>
         <RemoteTable 
            columns={columns}
            bordered
            isJson={true}
            query={query}
            ref='table'
            scroll={{ x: '110%' }}
            rowKey={'id'}
            url={replenishmentPlan.PURCHASEORDERLIST}
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
export default connect(state => state)(PlanOrder)