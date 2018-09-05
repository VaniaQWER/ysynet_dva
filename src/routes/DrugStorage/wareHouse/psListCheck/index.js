/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-06
 */
/**
 * @file 药库 - 入库--配送单验收--列表
 */
import React, { PureComponent } from 'react';
import { Form, Input, Row, Col, Select, Button, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';
import wareHouse from '../../../../api/drugStorage/wareHouse';
import RemoteTable from '../../../../components/TableGrid';
import {connect} from 'dva';
import _ from 'loadsh';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },//5
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  },
};
const columns = [
  {
   title: '配送单号',
   dataIndex: 'distributeCode',
   render: (text,record) =>{
     return <span>
        <Link to={{pathname: `/drugStorage/wareHouse/psListCheck/detail/id=${record.distributeCode}&state=${record.auditStatus}`}}>{text}</Link>
      </span>
   }
  },
  {
    title: '订单号',
    dataIndex: 'orderCode',
  },
  {
    title: '供应商',
    dataIndex: 'supplierName',
  },
  {
    title: '状态',
    dataIndex: 'statusName'
  },
  {
    title: '类型',
    dataIndex: 'typeName',
  },
  {
    title: '收货地址',
    dataIndex: 'deptAddress',
    className: 'ellipsis',
      render:(text)=>(
        <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
      )
  },
  {
    title: '验收时间',
    dataIndex: 'receptionTime',
  }
];

class SearchForm extends PureComponent{
  state = {
    display: 'none',
    type: [],
    status: []
  }
  constructor(props) {
    super(props)
    this.ChangeSupplier = _.debounce(this.ChangeSupplier, 300);
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'audit_status'
      },
      callback: (data)=>{
        this.setState({status: data})
      }
    });

    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'depot_type'
      },
      callback: (data)=>{
        this.setState({type: data})
      }
    });
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        for (const key in values) {
          values[key] = values[key] === undefined? "" : values[key];
        }
        this.props.query(values);
      };
    });
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }
  ChangeSupplier = (value) => {
    if(value === "") return;
    this.props.dispatch({
      type: 'wareHouse/getsupplierList',
      payload: {
        ctmaSupplierName: value
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    let { display, expand, type, status } = this.state;
    let {supplierList} = this.props;
    supplierList = supplierList.map(item=>{
      return (<Option key={item.ctmaSupplierCode} value={item.ctmaSupplierCode}>{item.ctmaSupplierName}</Option>)
    })
    type = type.map(item => {
      return (<Option key={item.value} value={item.value}>{item.label}</Option>)
    });
    status = status.map(item => {
      return (<Option key={item.value} value={item.value}>{item.label}</Option>)
    });
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`配送单/订单号`}>
              {
                getFieldDecorator(`distributeCode`)(
                  <Input placeholder='扫描或输入配送单/订单号' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`供应商`}>
              {
                getFieldDecorator(`supplierCode`)(
                  <Select
                    allowClear
                    showSearch
                    placeholder={'请选择'}
                    optionFilterProp="children"
                    onSearch={this.ChangeSupplier}
                  >
                      {supplierList}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`auditStatus`)(
                  <Select 
                    allowClear
                    showSearch
                    placeholder={'请选择'}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                    {status}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('type')(
                  <Select 
                    allowClear
                    showSearch
                    placeholder={'请选择'}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                    {type}
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
const WrapperForm = connect(state=>state.wareHouse)(Form.create()(SearchForm));

class DistributionCheck extends PureComponent{
  state = {
    query: {},
    data: []
  }

  queryHandler = (query) => {
    query.type = query.type === ""? 0 : query.type;
    this.refs.tab.fetch(query);
  }
  render(){
    let {query} = this.state;
    return (
      <div className='ysynet-main-content'>
         <WrapperForm query={this.queryHandler} />
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/AddNewCheck` })}>新建验收</Button>
         </div>
         <RemoteTable
          query={query}
          ref="tab"
          url={wareHouse.depotdistributeList}
          columns={columns}
          scroll={{ x: '100%' }}
          rowKey={'id'}
         />
      </div>
    )
  }
}
export default DistributionCheck;