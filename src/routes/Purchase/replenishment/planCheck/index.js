/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-29 15:52:42
 */

/**
 * @file 药库 - 补货管理--补货计划
 */
import React, { PureComponent } from 'react';
import { Form, Button, message, Tooltip, DatePicker, Select, Row, Col, Input,Icon  } from 'antd';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
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
    display: 'none'
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
        values.startTime = values.orderTime[0].format('YYYY-MM-DD HH:mm');
        values.endTime = values.orderTime[1].format('YYYY-MM-DD HH:mm');
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
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
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: '00'
                })(
                  <Select>
                    <Option key={-1} value='00'>待审核</Option>
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
                  <RangePicker />
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
                  <Select>
                    <Option key={-1} value=''>全部</Option>
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
    query: {},
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
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query })
  }
  render(){
    const { query } = this.state;
    const columns = [{
      title: '计划单号',
      dataIndex: 'planNo',
      width: 180,
      render: (text,record) =>{
        return <span>
          <Link to={{pathname: `/purchase/replenishment/planCheck/detail`}}>{text}</Link>
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
      title: '发起人',
      dataIndex: 'forgName',
      render: (text,record,index) => `发起人${index+1}`
    },{
      title: '发起时间',
      dataIndex: 'startTime',
      render: (text,record,index) => `2018-07-19 18: 00`
    },{
      title: '审核人',
      dataIndex: 'checkUser',
      render: (text,record,index) => `审核人${index+1}`
    },{
      title: '审核时间',
      dataIndex: 'checkTime'
    },{
      title: '收货地址',
      dataIndex: 'tfAddress',
      width: 270,
      className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
    }];
    return (
      <div className='ysynet-main-content'>
         <WrapperForm query={this.queryHandle}/>
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={this.delete} style={{ marginLeft: 8 }}>批量通过</Button>
         </div>
         <RemoteTable 
          ref='table'
          query={query}
          columns={columns}
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
export default PlanCheck;