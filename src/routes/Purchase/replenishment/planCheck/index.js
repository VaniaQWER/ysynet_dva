/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 18:10:57
 */

/**
 * @file 药库 - 补货管理--补货计划
 */
import React, { PureComponent } from 'react';
import { Form, Button, message, Tooltip, DatePicker, Select, Row, Col, Input,Icon  } from 'antd';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
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
    plan_type: [],// 类型
    audit_plan_status: [] // 状态
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    //类型
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'plan_type' },
      callback: (data) =>{
        this.setState({ plan_type: data })
      }
    })
    //状态
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'audit_plan_status' },
      callback: (data) =>{
        this.setState({ audit_plan_status: data })
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
        const orderTime = values.orderTime === undefined ? '' : values.orderTime;
        if(orderTime.length){
          values.startTime = values.orderTime[0].format('YYYY-MM-DD HH:mm');
          values.endTime = values.orderTime[1].format('YYYY-MM-DD HH:mm');
        }
        delete values.orderTime;
        values.queryType = '2'; // 审核列表参数
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({
      queryType: '2'
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand, plan_type, audit_plan_status } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`计划单号`}>
              {
                getFieldDecorator(`planCode`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入'/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`auditStatus`,{
                  initialValue: ''
                })(
                  <Select
                    allowClear={true}
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      audit_plan_status.map((item,index)=> <Option key={index} value={item.value}>{ item.label }</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`发起时间`}>
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
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('planType',{
                  initialValue: ''
                })(
                  <Select
                    allowClear={true}
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      plan_type.map((item,index)=> <Option key={index} value={item.value}>{ item.label }</Option>)
                    }
                  </Select>
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
class PlanCheck extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    query: {
      queryType: '2'
    },
  }
  
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query })
  }
  bitchPass = () =>{
    let { selected, selectedRows,query } = this.state;
    if(selected.length === 0){
      return message.warning('请至少选择一条数据');
    }
    let list = [],values = {};
    selectedRows.map(item => list.push(item.planCode));
    values.opType = '4' // 审核通过;
    values.list = list;
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'replenish/updateStatus',
      payload: { ...values },
      callback: () =>{
        this.setState({ loading: false, selected: [], selectedRows: [] });
        this.refs.table.fetch({ ...query, queryType: '2' });
      }
    })
  }
  render(){
    const { query, loading } = this.state;
    const columns = [{
      title: '计划单号',
      dataIndex: 'planCode',
      width: 250,
      render: (text,record) =>{
        return <span>
          <Link to={{pathname: `/purchase/replenishment/planCheck/detail/${record.planCode}/${record.auditStatus}`}}>{text}</Link>
        </span>  
      }
    },{
      title: '状态',
      dataIndex: 'statusName',
      width: 100,
    },{
      title: '类型',
      dataIndex: 'planTypeName',
      width: 100,
    },{
      title: '发起人',
      dataIndex: 'createUserName',
    },{
      title: '发起时间',
      dataIndex: 'createDate',
    },{
      title: '审核人',
      dataIndex: 'sheveUserName',
    },{
      title: '审核时间',
      dataIndex: 'sheveDate'
    },{
      title: '收货地址',
      dataIndex: 'receiveAddress',
      width: 270,
      className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
    }];
    return (
      <div className='ysynet-main-content'>
         <WrapperForm 
          query={this.queryHandle}
          dispatch={this.props.dispatch}
        />
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={this.bitchPass} loading={loading} style={{ marginLeft: 8 }}>批量通过</Button>
         </div>
         <RemoteTable 
            ref='table'
            query={query}
            columns={columns}
            url={replenishmentPlan.PLANLIST}
            bordered
            scroll={{ x: '130%' }}
            rowKey={'id'}
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
export default connect(state => state)(PlanCheck);