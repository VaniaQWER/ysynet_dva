/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 20:18:36
 */

/**
 * @file 药库 - 补货管理--目录外采购
 */
import React, { PureComponent } from 'react';
import { Form, Button, message, Tooltip, DatePicker, Select, Row, Col, Input  } from 'antd';
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
    fstateOptions: []// 状态下拉框
  }
  componentWillMount = () =>{
    this.genFstate();
  }
  genFstate = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'plan_status' },
      callback: (data) =>{
        this.setState({ fstateOptions: data })
      }
    })
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const createDate = values.createDate === undefined ? '' : values.createDate;
        if (createDate.length > 0) {
          values.startTime = createDate[0].format('YYYY-MM-DD');
          values.endTime = createDate[1].format('YYYY-MM-DD');
        }
        values.planType = '2';
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({ queryType: '1',planType: '2' });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { fstateOptions } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`计划单号`}>
              {
                getFieldDecorator(`planCode`,{
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
                getFieldDecorator(`auditStatus`,{
                  initialValue: ''
                })(
                  <Select
                    allowClear={true}
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      fstateOptions.map((item,index)=> <Option key={index} value={item.value}>{ item.label }</Option>)
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
                  <RangePicker />
                )
              }
            </FormItem>
          </Col>
          <Col span={24} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
         </Col>
        </Row>
      </Form>
    )
  }
}

const WrapperForm = Form.create()(SearchForm);
class OutCatalogPurchase extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    query: {
      queryType: '1',
      planType: '2'
    },
  }
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query })
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
    const { query } = this.state;
    const columns = [{
      title: '计划单号',
      dataIndex: 'planCode',
      width: 280,
      render: (text,record) =>{
        return <span>
          <Link to={{pathname: `/purchase/replenishment/outCatalogPurchase/detail/${record.planCode}`}}>{text}</Link>
        </span>  
      }
    },{
      title: '状态',
      dataIndex: 'statusName',
      width: 112,
    },{
      title: '类型',
      dataIndex: 'planTypeName',
      width: 168,
    },{
      title: '发起人',
      dataIndex: 'createUserName',
      width: 112,
    },{
      title: '发起时间',
      dataIndex: 'createDate',
      width: 224,
    },{
      title: '收货地址',
      dataIndex: 'receiveAddress',
      width: 280,
      className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
    },];
    return (
      <div className='ysynet-main-content'>
         <WrapperForm 
          query={this.queryHandle}
          dispatch={this.props.dispatch}
          />
         <div className='ant-row-bottom'>
            <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/createOutCatalogPurcahsePlan` })}>新建计划</Button>
            <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>删除</Button>
         </div>
         <RemoteTable
            ref='table'
            query={query}
            url={replenishmentPlan.PLANLIST}
            columns={columns}
            scroll={{ x: 1176 }}
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
export default connect(state =>state)(OutCatalogPurchase)