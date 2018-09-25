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
import FetchSelect from '../../../../components/FetchSelect';
import {connect} from 'dva';

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
   width: 280,
   render: (text,record) =>{
     return <span>
        <Link to={{pathname: `/drugStorage/wareHouse/psListCheck/detail/id=${record.distributeCode}&state=${record.auditStatus}`}}>{text}</Link>
      </span>
   }
  },
  {
    title: '订单号',
    dataIndex: 'orderCode',
    width: 280,
  },
  {
    title: '供应商',
    dataIndex: 'supplierName',
    width: 224,
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: 112,
  },
  {
    title: '类型',
    dataIndex: 'typeName',
    width: 168,
  },
  {
    title: '收货地址',
    dataIndex: 'deptAddress',
    width: 280,
    className: 'ellipsis',
      render:(text)=>(
        <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
      )
  },
  {
    title: '验收时间',
    width: 168,
    dataIndex: 'receptionTime',
  }
];

class SearchForm extends PureComponent{
  state = {
    display: 'none',
    type: [],
    status: [],
    value: undefined
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
        values.supplierCodeList = this.state.value? [this.state.value] : [];
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
  listRender = (list) => {
    return list.map(item => {
      return (<Option key={item.value} value={item.value}>{item.label}</Option>)
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    let { display, expand, type, status, value } = this.state;
    type = this.listRender(type);
    status = this.listRender(status);
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
                <FetchSelect
                  value={value}
                  url={wareHouse.SUPPLIER_LIST}
                  queryKey="ctmaSupplierName"
                  valueAndLabel={{
                    value: 'ctmaSupplierCode',
                    label: 'ctmaSupplierName'
                  }}
                  allowClear
                  placeholder={'请选择'}
                  optionFilterProp="children"
                  cb={(value) => {
                    this.setState({
                      value
                    })
                  }}
                />
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
    query: {
      checkType: 1
    },
    data: []
  }

  queryHandler = (queryValue) => {
    let {query} = this.state;
    this.setState({
      query: {
        ...query,
        ...queryValue
      }
    });
    // this.ref.table.fetch(query)
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
          isJson={true}
          query={query}
          ref="tab"
          url={wareHouse.depotdistributeList}
          columns={columns}
          scroll={{ x: 1512 }}
          rowKey={'id'}
        />
      </div>
    )
  }
}
export default DistributionCheck;